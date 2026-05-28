// controls.js
export class ControlsManager {
    constructor(gameEngine) {
        this.engine = gameEngine;
        this.keys = {};
        this.autoCycle = true;
        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            if (e.code === 'Space' && this.engine.isGrounded && !this.engine.inDialogue) {
                this.engine.pVelocity.y = 16.5;
                this.engine.isGrounded = false;
            }
            if (e.code === 'KeyE' && this.engine.nearestNPC && !this.engine.inDialogue) {
                this.engine.startDialogue(this.engine.nearestNPC.userData.config);
            }
            if (e.code === 'KeyM') {
                if (this.engine.mapModal) this.engine.mapModal.open();
            }
            if (e.code === 'KeyR') {
                if (document.getElementById('modal-overlay').classList.contains('active')) return;
                this.autoCycle = !this.autoCycle;
                this.displayAlert(this.autoCycle ? "Auto day/night enabled" : "Celestial timeline frozen");
            }
        });

        window.addEventListener('keyup', (e) => this.keys[e.code] = false);

        // Sidebar panel toggling
        const leftPanel = document.getElementById('left-sidebar');
        const rightPanel = document.getElementById('right-sidebar');
        const leftBtn = document.getElementById('toggle-left-btn');
        const rightBtn = document.getElementById('toggle-right-btn');

        leftBtn.addEventListener('click', () => {
            leftPanel.classList.toggle('panel-hidden');
            leftBtn.innerHTML = leftPanel.classList.contains('panel-hidden')
                ? '<i class="fa-solid fa-chevron-right"></i>'
                : '<i class="fa-solid fa-chevron-left"></i>';
        });

        rightBtn.addEventListener('click', () => {
            rightPanel.classList.toggle('panel-hidden');
            rightBtn.innerHTML = rightPanel.classList.contains('panel-hidden')
                ? '<i class="fa-solid fa-chevron-left"></i>'
                : '<i class="fa-solid fa-chevron-right"></i>';
        });
    }

    displayAlert(msg) {
        const el = document.getElementById('screen-alert');
        el.innerText = msg;
        el.style.display = 'block';
        setTimeout(() => el.style.display = 'none', 3500);
    }
}