import unittest
from ink_to_json import parse_ink


class StatefulInkTests(unittest.TestCase):
    def test_entry_and_variables(self):
        result = parse_ink('VAR ready = false\n-> intro\n=== start ===\nUnused.\n-> DONE\n=== intro ===\n~ ready = true\n{ ready:\nYes.\n- else:\nNo.\n}\n-> DONE')
        self.assertEqual(result['_meta']['entry'], 'intro')
        self.assertEqual(result['_meta']['variables'], {'ready': False})
        self.assertNotIn('~', result['intro']['content'])
        self.assertEqual(result['intro']['steps'][0]['set'], 'ready')

    def test_choices_and_diverts(self):
        result = parse_ink('=== start ===\n* {evidence_clue} [Ask] -> end\n+ [Leave] -> end\n=== end ===\n-> DONE')
        self.assertTrue(result['start']['choices'][0]['once'])
        self.assertFalse(result['start']['choices'][1]['once'])
        self.assertEqual(result['end']['steps'], [{'divert': 'DONE', 'condition': {'all': []}}])

    def test_no_silent_control_syntax(self):
        for source in ['~ x = dangerous()', '{oops', 'INCLUDE other.ink', '* malformed']:
            with self.subTest(source=source), self.assertRaises((ValueError, SyntaxError)):
                parse_ink('=== start ===\n' + source)

    def test_missing_and_duplicate_passages_fail_conversion(self):
        for source in ['=== start ===\n-> absent', '=== start ===\n-> DONE\n=== start ===\nAgain']:
            with self.assertRaises(ValueError):
                parse_ink(source)

    def test_revision_changes_with_content(self):
        a = parse_ink('=== start ===\nHello\n-> DONE')
        b = parse_ink('=== start ===\nGoodbye\n-> DONE')
        self.assertNotEqual(a['_meta']['revision'], b['_meta']['revision'])


if __name__ == '__main__':
    unittest.main()
