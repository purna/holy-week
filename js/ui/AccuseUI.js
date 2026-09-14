export class AccuseUI {
    constructor(caseManager) {
        this.cm = caseManager;
    }

    _outcomeOptions(caseId) {
        const options = {
            triumphal_entry: [
                ["The disciples took the colt without permission and used a religious phrase to excuse the theft.", false],
                ["The owner willingly released the colt using Jesus's arranged phrase, fulfilling prophecy.", true],
                ["Jesus's followers hired the colt and staged the procession to make Him resemble Zechariah's promised king.", false],
                ["The colt had simply broken loose, and the crowd later turned an ordinary recovery into a messianic story.", false]
            ],
            temple_cleansing: [
                ["Jesus deliberately drove out predatory commerce from the Gentile court, asserting authority over His Father's house.", true],
                ["Jesus caused a reckless disturbance against lawful Temple merchants and endangered the Passover crowds.", false],
                ["The merchants started the disorder themselves during a dispute over exchange rates, and Jesus was blamed afterward.", false],
                ["Jesus's disciples planned the disruption to provoke the priests and draw public attention to their teacher.", false]
            ],
            fig_tree_incident: [
                ["The tree was already diseased; its apparently sudden death was exaggerated after the event.", false],
                ["The disciples saw a different withered tree the next morning and mistakenly linked it to Jesus's words.", false],
                ["Jesus used the tree's overnight withering as a prophetic lesson about fruitless faith.", true],
                ["Someone damaged the tree overnight to make Jesus's warning appear miraculous.", false]
            ],
            authority_challenged: [
                ["The teachers questioned Jesus sincerely, but His followers later portrayed an ordinary debate as a coordinated trap.", false],
                ["Jesus avoided every difficult question by changing the subject and intimidating His opponents with the crowd.", false],
                ["The disputes were separate political arguments with no shared attempt to undermine Jesus's authority.", false],
                ["Religious factions coordinated legal and theological traps, but Jesus answered them and exposed their hypocrisy.", true]
            ],
            lazarus_plot: [
                ["The chief priests secretly planned to kill Lazarus and suppress evidence of his resurrection.", true],
                ["The authorities only planned to question Lazarus because his family had staged a recovery from illness as a resurrection.", false],
                ["The execution rumour was invented by Jesus's followers to make the priesthood appear afraid of Lazarus's testimony.", false],
                ["Lazarus was being targeted as a political agitator whose popularity threatened public order, not as evidence of a miracle.", false]
            ],
            olivet_discourse: [
                ["Jesus was predicting only an approaching Roman attack on Jerusalem, not a wider prophetic fulfilment or future return.", false],
                ["Jesus prepared His disciples for Jerusalem's fall and His return, calling them to readiness.", true],
                ["The disciples combined several unrelated sayings after the Temple fell to make Jesus appear to have predicted it precisely.", false],
                ["Jesus gave His followers a secret timetable for the end, which they later concealed when the date failed.", false]
            ],
            passover_lamb_chain: [
                ["The anointing was an extravagant social custom with no connection to Jesus's burial or the Passover lamb.", false],
                ["Jesus's followers later arranged unrelated events into a Passover pattern that nobody recognised at the time.", false],
                ["Mary's costly anointing prepared Jesus for burial and revealed the Passover Lamb pattern.", true],
                ["Judas objected because the perfume genuinely belonged to funds promised to the poor, not because of self-interest.", false]
            ],
            last_supper: [
                ["A hurried servant broke the cup during preparation, and suspicion fell on Judas only after his betrayal became known.", false],
                ["Judas's agitation around his betrayal led to the broken cup before he left into the night.", true],
                ["Peter knocked over the cup during an argument about loyalty and later allowed Judas to take the blame.", false],
                ["The broken cup and spilled wine were later added as symbols of betrayal and were not connected to an actual incident.", false]
            ],
            gethsemane_arrest: [
                ["Jesus's group began an armed resistance, and the later healing story was created to hide their violence.", false],
                ["Malchus was wounded accidentally by another guard in the confusion, not by one of Jesus's disciples.", false],
                ["Peter struck Malchus with a sword; Jesus stopped the violence, restored the wounded ear, and surrendered willingly.", true],
                ["Malchus suffered only a minor cut, which witnesses exaggerated into a severed ear and miraculous healing.", false]
            ],
            sanhedrin_trial: [
                ["The Sanhedrin manufactured testimony in a predetermined and unlawful trial.", true],
                ["The council followed an emergency legal process and convicted Jesus only after reliable witnesses agreed.", false],
                ["Jesus freely confessed to a straightforward charge of political rebellion, making further testimony unnecessary.", false],
                ["The conflicting-witness story was added by His followers to discredit a lawful verdict after His death.", false]
            ],
            barabbas_choice: [
                ["The crowd independently chose Barabbas because they regarded Jesus as the more dangerous threat to public order.", false],
                ["Pilate had already decided to execute Jesus and used the crowd merely to shift responsibility for his own verdict.", false],
                ["The prisoner exchange was a later symbolic story created to present Jesus as dying in a guilty man's place.", false],
                ["Religious leaders stirred the crowd to demand Barabbas, then used that pressure to overcome Pilate's reluctance.", true]
            ],
            crucifixion_site: [
                ["Jesus died as an unsuccessful political claimant, and His followers later matched ordinary execution details to prophecy.", false],
                ["Jesus submitted to crucifixion, while the manner of His death, the signs at Golgotha, and His burial fulfilled prophetic details.", true],
                ["The darkness and earthquake were unrelated natural events that His followers used to give the execution divine meaning.", false],
                ["The Romans disposed of Jesus in a common grave; the rich man's tomb and unbroken bones were later additions.", false]
            ],
            resurrection: [
                ["The disciples stole the body while the guards slept, then used the empty tomb to claim Jesus had risen.", false],
                ["The women visited the wrong tomb before dawn, and later reports repeated their honest mistake.", false],
                ["Jesus rose from the dead; the opened tomb revealed His absence, and multiple witnesses later reported encounters with Him.", true],
                ["Joseph quietly moved the body to another burial place, but the disciples mistook its absence for resurrection.", false]
            ],
            roman_inquiry: [
                ["The guards fell asleep, allowing the disciples to break the seal and steal the body without being seen.", false],
                ["The chief priests bribed the guards to spread a false theft story after the resurrection.", true],
                ["The guards abandoned their post during the earthquake and invented an angelic encounter to avoid Roman punishment.", false],
                ["Jesus had not truly died; He recovered in the tomb and escaped after the stone was moved.", false]
            ],
            peter_restoration: [
                ["Peter returned to fishing because the other disciples had removed him from leadership after his three denials.", false],
                ["The disciples met an unknown teacher on the shore, whom grief and expectation led them to identify as Jesus.", false],
                ["The three questions were a public rebuke proving that Peter had forfeited his former place among the disciples.", false],
                ["The risen Jesus answered Peter's three denials with forgiveness and a threefold commission.", true]
            ],
            ascension: [
                ["Jesus withdrew into the hills, and cloud and distance caused the disciples to believe He had risen into heaven.", false],
                ["The Ascension account was created later to explain why appearances of Jesus had stopped.", false],
                ["Jesus commissioned His disciples, was visibly taken up into a cloud, and two heavenly messengers promised His return.", true],
                ["The disciples experienced a private spiritual vision, but no visible departure or angelic message occurred.", false]
            ]
        };
        return options[caseId] || [];
    }

    render(options = {}) {
        const c = this.cm.getActiveCase();
        if (!c) return '';

        const prophecies = (c.prophecies || []).map(p => ({
            ...p,
            status: this.cm.getCodexStatus(p.id)
        }));
        const total = prophecies.length;
        const unlocked = prophecies.filter(p => p.status === 'found_scripture' || p.status === 'complete').length;
        const complete = prophecies.filter(p => p.status === 'complete').length;
        const canConclude = options.canConclude ? this.cm.canConcludeCase() : false;
        const isConcluded = options.isConcluded || false;
        const outcomeOptions = this._outcomeOptions(c.id);
        const outcomeUnlocked = total > 0 && complete === total;

        const statusIcon = (status) => {
            if (status === 'complete') return '<i class="fa-solid fa-check"></i>';
            if (status === 'found_scripture') return '<i class="fa-solid fa-scroll"></i>';
            if (status === 'rumor') return '<i class="fa-solid fa-question"></i>';
            return '<i class="fa-solid fa-circle-dot"></i>';
        };

        let concludeButton;
        if (isConcluded) {
            concludeButton = `<button class="conclude-btn concluded" onclick="showConclusionResult()"><i class="fa-solid fa-gavel"></i> Concluded Case</button>`;
        } else if (canConclude) {
            concludeButton = `<button class="conclude-btn" onclick="conclude()"><i class="fa-solid fa-gavel"></i> Conclude Case</button>`;
        } else {
            concludeButton = `<button class="conclude-btn" disabled title="Find all evidence and complete all prophecies to unlock"><i class="fa-solid fa-gavel"></i> Conclude Case</button>`;
        }

        return `<h3 class="section-title">Case File</h3>
            <div class="prophecy-accuse-intro">
                Close this case once every prophecy has been researched in the Lab. The truth behind it is revealed when you do.
            </div>
            <div class="accuse-panel">
                <div class="case-file-progress">
                    <div class="case-file-progress-label">Prophecies Unlocked</div>
                    <div class="case-file-progress-value">${unlocked} / ${total}</div>
                </div>
                 <div class="prophecy-checklist">
                      ${prophecies.map(p => {
                          const isClickable = p.status === 'complete' || p.status === 'found_scripture';
                          const clickHandler = isClickable ? `onclick="window.ui.showProphecyDetail('${p.id}')"` : '';
                          return `
                          <div class="prophecy-checklist-item status-${p.status}" ${clickHandler}>
                              <span class="prophecy-checklist-icon" aria-hidden="true">${statusIcon(p.status)}</span>
                              <span class="prophecy-checklist-name">${p.status === 'unseen' ? '???' : p.reference}</span>
                          </div>`;
                      }).join("")}
                  </div>
                ${concludeButton}
                <form class="what-happened-section ${outcomeUnlocked ? '' : 'locked'}" data-case-outcome-form>
                    <fieldset class="case-outcome-fieldset" ${isConcluded || !outcomeUnlocked ? 'disabled' : ''} aria-describedby="case-outcome-instruction">
                        <legend class="what-happened-label">What happened?</legend>
                        <p class="case-outcome-instruction" id="case-outcome-instruction">
                            ${outcomeUnlocked
                                ? 'Choose the explanation that best fits all the evidence.'
                                : `<i class="fa-solid fa-lock" aria-hidden="true"></i> Research every case prophecy in the Lab to unlock these answers. (${complete}/${total} complete)`}
                        </p>
                        <div class="case-outcome-options">
                            ${outcomeOptions.map(([text, correct], index) => `
                                <label class="case-outcome-option">
                                    <input type="radio" name="case-outcome" value="${index}" data-correct="${correct}">
                                    <span>${text}</span>
                                </label>`).join('')}
                        </div>
                    </fieldset>
                    <div class="case-outcome-feedback" role="status" aria-live="polite"></div>
                    <button type="submit" id="btn-submit-theory" class="conclude-btn" ${isConcluded || !outcomeUnlocked ? 'disabled title="Research every case prophecy to unlock"' : ''}>
                        <i class="fa-solid fa-check"></i> Check Answer
                    </button>
                </form>
            </div>`;
    }

    bindEvents(root) {
        const form = root?.querySelector('[data-case-outcome-form]');
        if (!form) return;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const selected = form.querySelector('input[name="case-outcome"]:checked');
            const feedback = form.querySelector('.case-outcome-feedback');
            if (!selected) {
                feedback.textContent = 'Choose one explanation before checking your answer.';
                feedback.className = 'case-outcome-feedback error';
                return;
            }
            const label = selected.closest('.case-outcome-option');
            const answer = label?.querySelector('span')?.textContent?.trim() || '';
            this.cm.recordTheory(this.cm.getActiveCase()?.id, answer);
            if (selected.dataset.correct === 'true') {
                feedback.textContent = 'Correct — this explanation fits the evidence.';
                feedback.className = 'case-outcome-feedback success';
                form.querySelector('fieldset').disabled = true;
                form.querySelector('button[type="submit"]').disabled = true;
            } else {
                feedback.textContent = 'Not quite. Review the evidence and try another explanation.';
                feedback.className = 'case-outcome-feedback error';
                label?.classList.add('incorrect');
            }
        });
    }
}
