import Component from '@ember/component'
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { filterBy } from '@ember/object/computed'
import { later } from '@ember/runloop'

export default class NotesViewComponent extends Component {
  @service store
  @service router
  @service currentContent
  @service vdoservice
  @service youtubePlayer

  @filterBy('runAttempt.notes', 'isNew', false) savedNotes

  requestErrored = false

  @restartableTask addNoteTask = function* ()  {
    const contentId = this.get('currentContent').getContentId()
    const store = this.get('store')

    const content = store.peekRecord('content', contentId)
    let duration ;
    switch (content.get('contentable')) {
      case 'lecture':  duration = this.get('vdoservice').currentTime; break;
      case 'video': duration = this.get('youtubePlayer').getCurrentTime(); break;
      default: duration = 0
    }

    const note = store.createRecord('note', {
      text: this.get('newNoteText'),
      content,
      duration
    })

    note.set('runAttempt', this.get('runAttempt'))

    try {
      yield note.save()
      this.set('newNoteText', '')
    } catch (err) {
      console.error(err)
      this.set('requestErrored', true)
      later(() => this.set("requestErrored", false), 1000)
    }
  }
}
