"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedError = void 0;
const parsedCode_1 = require("./parsedCode");
const ParsedParameter_1 = require("./ParsedParameter");
const vscode_languageserver_1 = require("vscode-languageserver");
class ParsedError extends parsedCode_1.ParsedCode {
    constructor() {
        super(...arguments);
        this.input = [];
        this.completionItem = null;
    }
    initialise(element, document, contract, isGlobal) {
        super.initialise(element, document, contract, isGlobal);
        this.name = element.name;
        this.initialiseParamters();
        this.id = element.id;
    }
    toDocumentSymbol() {
        const errorRange = this.getRange();
        const errorSymbol = vscode_languageserver_1.DocumentSymbol.create(this.name, this.getSimpleInfo(), vscode_languageserver_1.SymbolKind.Class, errorRange, errorRange);
        errorSymbol.children = this.input.map(param => param.toDocumentSymbolType('Input Parameter'));
        return errorSymbol;
    }
    getSimpleInfo() {
        const params = this.input
            .map(param => `${param.name}: ${param.type.getSimpleInfo()}`)
            .join(', ');
        return `Error ${this.name}(${params})`;
    }
    initialiseParamters() {
        this.input = ParsedParameter_1.ParsedParameter.extractParameters(this.element.params, this.contract, this.document, this);
    }
    createCompletionItem() {
        if (this.completionItem === null) {
            const completionItem = vscode_languageserver_1.CompletionItem.create(this.name);
            completionItem.kind = vscode_languageserver_1.CompletionItemKind.Function;
            const paramsSnippet = ParsedParameter_1.ParsedParameter.createFunctionParamsSnippet(this.element.params, false);
            completionItem.insertTextFormat = 2;
            completionItem.insertText = this.name + '(' + paramsSnippet + ');';
            completionItem.documentation = this.getMarkupInfo();
            this.completionItem = completionItem;
        }
        return this.completionItem;
    }
    getSelectedTypeReferenceLocation(offset) {
        if (this.isCurrentElementedSelected(offset)) {
            let results = [];
            this.input.forEach(x => results = this.mergeArrays(results, x.getSelectedTypeReferenceLocation(offset)));
            const foundResult = parsedCode_1.FindTypeReferenceLocationResult.filterFoundResults(results);
            if (foundResult.length > 0) {
                return foundResult;
            }
            else {
                return [parsedCode_1.FindTypeReferenceLocationResult.create(true)];
            }
        }
        return [parsedCode_1.FindTypeReferenceLocationResult.create(false)];
    }
    getSelectedItem(offset) {
        let selectedItem = null;
        if (this.isCurrentElementedSelected(offset)) {
            let allItems = [];
            allItems = allItems.concat(this.input);
            selectedItem = allItems.find(x => x.getSelectedItem(offset));
            if (selectedItem !== undefined && selectedItem !== null) {
                return selectedItem;
            }
            return this;
        }
        return selectedItem;
    }
    getParsedObjectType() {
        return 'Error';
    }
    getInfo() {
        const elementType = this.getParsedObjectType();
        return '### ' + elementType + ': ' + this.name + '\n' +
            '#### ' + this.getContractNameOrGlobal() + '\n' +
            '\t' + this.getSignature() + ' \n\n' +
            this.getComment();
    }
    getDeclaration() {
        return 'error';
    }
    getSignature() {
        const paramsInfo = ParsedParameter_1.ParsedParameter.createParamsInfo(this.element.params);
        return this.getDeclaration() + ' ' + this.name + '(' + paramsInfo + ') \n\t\t';
    }
}
exports.ParsedError = ParsedError;
//# sourceMappingURL=ParsedError.js.map