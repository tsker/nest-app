export class BodyHidden {
    public static count = 0;

    private isHidden: boolean = false;
    open () {
        if (this.isHidden) return;

        this.isHidden = true;
        BodyHidden.count += 1;

        document.body.style.paddingRight = '15px';
        document.body.style.overflow = 'hidden';
    }
    cancel () {
        if (!this.isHidden) return;

        this.isHidden = false;
        BodyHidden.count -= 1;

        if (BodyHidden.count <= 0) {
            BodyHidden.count = 0;
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
    }
}
