import say from './modules/index';
import Greeter from './modules/Greeter';
import _ from 'lodash';

import './style.css';

const g = new Greeter();
g.greet();

const arr = _.concat([1, 2, 3], 4, [5]);

say('hello rollup' + arr);

const container = `<p class="container" style="color: red">内容</p>`;
document.getElementById('wrap').innerHTML = container;
