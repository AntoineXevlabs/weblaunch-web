export class meetingForm {
    public currentState = 1;
    public firstForm = document.getElementById('popup-form-first-section');
    public secondForm = document.getElementById('popup-form-second-section');

    public formSections = document.getElementsByClassName('form-section');
    public spacers = document.getElementsByClassName('spacer');
    public steps = document.getElementsByClassName('step');
    public sendButton = document.getElementById('meeting-send-button');
    public loading = false;
    private firstFormData: FormData;
    private secondFormData: FormData;
    private checkmark = document.getElementById('form-loader')
    constructor() {
        this.firstForm.addEventListener('submit', (e) => {
            this.firstFormData = new FormData(e.target as HTMLFormElement);
            e.preventDefault();
            this.next();
        });
        this.secondForm.addEventListener('submit', (e) => {
            this.secondFormData = new FormData(e.target as HTMLFormElement);
            e.preventDefault();
            this.send();
        })
    }
    public reset() {
        for (let element of this.formSections) {
            element.style.transform = ``;
        }
        for (let element of this.spacers) {
            element.classList.remove('active')
        }
        for (let element of this.steps) {
            element.classList.remove('active')
        }
        this.steps[0].classList.add('active');
        this.currentState = 1;
    }
    public next() {
        for (let element of this.formSections) {
            element.style.transform = `translateX(-${this.currentState*100}%)`;
        }
        this.spacers[this.currentState-1].classList.add('active');
        this.steps[this.currentState].classList.add('active');
        this.currentState += 1;
    }

    public send() {
        let _local = this;
        this.toggleLoad();
        let formData = {};
        for (const key of this.firstFormData.keys()) {
            formData[key] = this.firstFormData.get(key)
        }
        for (let key of this.secondFormData.keys()) {
            formData[key] = this.secondFormData.get(key)
        }
        console.log(formData);
        setTimeout(function () {
            _local.next();
            _local.toggleCheckmark();
            _local.toggleLoad();
        }, 1000)
    }

    private toggleLoad() {
        if (this.loading) {
            this.sendButton.classList.remove('onclick');
            this.sendButton.textContent = 'Prendre rendez-vous';
            this.loading = false;
        } else {
            this.sendButton.classList.add('onclick');
            this.sendButton.textContent = '';
            this.loading = true;
        }
    }

    private toggleCheckmark() {
        this.checkmark.classList.add('load-complete');
        this.checkmark.children[0].style.display = 'block'
    }
}