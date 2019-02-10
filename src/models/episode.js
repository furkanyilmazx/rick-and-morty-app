import { RestBaseModel } from 'rest-in-model';

export default class Episode extends RestBaseModel {
  getConfig() {
    return {
      fields: {
        id: { primary: true},
        name: {},
        air_date: {},
        episode: {},
        characters: {},
        url: {},
        created: {},
      },
      resultListField: (response) => response.results,
      paths: {
        default: 'episode',
      },
    };
  }
}
