import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
    headData: service(),

    // eslint-disable-next-line no-unused-vars
    afterModel(model) {
      this.set('headData.title', 'Coding Blocks Online | My Courses')
    }
});
