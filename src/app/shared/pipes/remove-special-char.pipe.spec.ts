import { RemoveSpecialCharPipe } from './remove-special-char.pipe';

describe('RemoveSpecialCharPipe', () => {
    const pipe = new RemoveSpecialCharPipe();
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('check with regEx Arg Passed', () => {
        expect(pipe.transform('NOT_LOCKED', '_')).toBe('NOT LOCKED');
    });

    it('check with replace Arg Passed', () => {
        expect(pipe.transform('NOT@LOCKED', '@', '-')).toBe('NOT-LOCKED');
    });

    it('check with replace character All', () => {
        expect(pipe.transform('NOT_LOCKED_CHECKED', '_', ' ')).toBe('NOT LOCKED CHECKED');
    });

    it('check with replace character Once with Arg Passed', () => {
        expect(pipe.transform('NOT_LOCKED_CHECKED', '_', ' ', true)).toBe('NOT LOCKED_CHECKED');
    });
});

