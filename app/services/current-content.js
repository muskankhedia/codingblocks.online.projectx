import Service from '@ember/service'
import { inject as service } from '@ember/service';

export default class CurrentContentService extends Service {
    @service store
    _contentId = null

    setContentId (contentId) {
        this._contentId = contentId
    }

    getContentId () {
        return this._contentId
    }

    getContent () {
        if (this._contentId) {
            return this.get('store').peekRecord('content', this._contentId)
        } else {
            return null
        }
    }
}