import { EggPlugin } from 'egg';
export default {
  static: true, // default is true
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  }
} as EggPlugin;
