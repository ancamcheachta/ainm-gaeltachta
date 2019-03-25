'use strict';

const chai = require('chai');
const ainmGaeltachta = require ('./index');
const assert = chai.assert;

describe('Tástálacha `getAinmGaeltachta()`', () => {
    it('tuigeann sé ainm trípháirteach simplí', () => {
        let output = ainmGaeltachta.getAinmGaeltachta(['Seán', 'Pól', 'Séamus']);
        
        assert(output == 'Seán Phóil Shéamuis', 'Níor tháinig an luach amach i gceart');
    });
});
