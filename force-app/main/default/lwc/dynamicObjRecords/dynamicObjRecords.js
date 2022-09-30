import { LightningElement } from 'lwc';
import noHeader from '@salesforce/resourceUrl/noheader';

import {loadStyle} from "lightning/platformResourceLoader";

export default class DynamicObjRecords extends LightningElement {

    connectedCallback() {
        loadStyle(this, noHeader)
            .then(result => {});
    }
}