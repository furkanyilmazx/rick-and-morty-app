import { RestBaseModel } from 'rest-in-model';

export default class Character extends RestBaseModel {
  getConfig() {
    return {
      fields: {
        id: { primary: true},
        name: {},
        status: {},
        species: {},
        type: {},
        gender: {},
        origin: {},
        location: {},
        image: {},
        url: {},
        episode: {},
        created: {},
      },
      resultListField: (response) => response.results,
      paths: {
        default: 'character',
      },
    };
  }
}
