class CountryFlag {
    public characterMap = {
        A: this.getEmojiByUnicode(0x1F1E6),
        B: this.getEmojiByUnicode(0x1F1E7),
        C: this.getEmojiByUnicode(0x1F1E8),
        D: this.getEmojiByUnicode(0x1F1E9),
        E: this.getEmojiByUnicode(0x1F1EA),
        F: this.getEmojiByUnicode(0x1F1EB),
        G: this.getEmojiByUnicode(0x1F1EC),
        H: this.getEmojiByUnicode(0x1F1ED),
        I: this.getEmojiByUnicode(0x1F1EE),
        J: this.getEmojiByUnicode(0x1F1EF),
        K: this.getEmojiByUnicode(0x1F1F0),
        L: this.getEmojiByUnicode(0x1F1F1),
        M: this.getEmojiByUnicode(0x1F1F2),
        N: this.getEmojiByUnicode(0x1F1F3),
        O: this.getEmojiByUnicode(0x1F1F4),
        P: this.getEmojiByUnicode(0x1F1F5),
        Q: this.getEmojiByUnicode(0x1F1F6),
        R: this.getEmojiByUnicode(0x1F1F7),
        S: this.getEmojiByUnicode(0x1F1F8),
        T: this.getEmojiByUnicode(0x1F1F9),
        U: this.getEmojiByUnicode(0x1F1FA),
        V: this.getEmojiByUnicode(0x1F1FB),
        W: this.getEmojiByUnicode(0x1F1FC),
        X: this.getEmojiByUnicode(0x1F1FD),
        Y: this.getEmojiByUnicode(0x1F1FE),
        Z: this.getEmojiByUnicode(0x1F1FF)
    }

    public getFlagByChar (char: string) {
        // check if exist '-'
        const self = this as any
        let countryCode
        if (/-/g.test(char)) {
            // split by '-'
            countryCode = char.split('-')[1]
        } else {
            countryCode = char
        }
        let flagStr: string = ''
        if (countryCode === 'TW') {
            countryCode = 'HK'
        }
        for (const str of countryCode) {
            flagStr += self.characterMap[str]
        }
        return flagStr
    }
    private getEmojiByUnicode (unicode: number) {
        return String.fromCodePoint(unicode)
    }
}

export default CountryFlag
