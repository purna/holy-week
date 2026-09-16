import json
import tempfile
import unittest
from pathlib import Path

from audit_ink import audit, reflow
from ink_to_json import parse_ink


class InkAuditTests(unittest.TestCase):
    def inspect(self, text):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'story.ink'
            path.write_text(text)
            try:
                compiled = parse_ink(text)
            except (ValueError, SyntaxError):
                compiled = {}
            path.with_suffix('.json').write_text(json.dumps(compiled))
            return [kind for _, kind, _ in audit(path)[0]]

    def test_reflow_preserves_structure_and_paragraphs(self):
        before = '=== start ===\nOne\nword\nper\nline.\n\nNext\nparagraph.\n# UNLOCK_EVIDENCE: clue\n* [Go] -> end\n=== end ===\n-> DONE\n'
        after = reflow(before)
        self.assertIn('One word per line.\n\nNext paragraph.', after)
        self.assertIn('\n# UNLOCK_EVIDENCE: clue\n* [Go] -> end\n', after)
        self.assertEqual(reflow(after), after)

    def test_first_node_is_valid_runtime_entry(self):
        self.assertEqual(self.inspect('-> intro\n=== intro ===\nHello.\n-> DONE\n'), [])

    def test_missing_link_is_not_silently_an_ending(self):
        kinds = self.inspect('=== start ===\nHello.\n* [Go] -> missing\n')
        self.assertIn('missing', kinds)
        self.assertIn('no_exit', kinds)

    def test_duplicate_and_unreachable(self):
        kinds = self.inspect('=== start ===\nHello.\n-> DONE\n=== spare ===\nUnused.\n-> DONE\n=== spare ===\nOverwrite.\n-> DONE\n')
        self.assertIn('duplicate', kinds)
        self.assertIn('unreachable', kinds)

    def test_loop_with_exit_is_valid(self):
        self.assertEqual(self.inspect('=== start ===\nHello.\n* [Again] -> start\n* [Leave] -> end\n=== end ===\nGoodbye.\n-> DONE\n'), [])

    def test_malformed_structure_and_tag(self):
        kinds = self.inspect('=== start ===\n# UNLOCK_EVIDENCE: clueProse follows.\n* [Go] -> one -> two\n')
        self.assertIn('syntax', kinds)
        self.assertIn('tag', kinds)


if __name__ == '__main__':
    unittest.main()
