'use strict';

const chai = require('chai');
const AinmGaeltachta = require ('./index');
const assert = chai.assert;

describe('Tástálacha `getNormalisedForm()`', () => {
    it('tuigeann sé ainm trípháirteach simplí', () => {
        let output = AinmGaeltachta(['Seán', 'Pól', 'Séamus'])
            .getNormalisedForm();
        
        assert(output == 'Seán Phóil Shéamuis', 'Níor tháinig an luach amach i gceart');
    });
});
