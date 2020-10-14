

/**
 * Base Page Object Class
 * @class Page
 */
export default class Page {
    constructor() {}

    open(path) {
        browser.url(path);
    }
}
