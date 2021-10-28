import say from '@/modules/index';
import Greeter from '@/modules/Greeter';
import _ from 'lodash';



import '@/style.css';

import logo from '@/assets/images/404.png';

const img = new Image();
img.src = logo;

document.getElementById('wrap').appendChild(img);

document.body.appendChild(logo);

const g = new Greeter();
g.greet();

const arr = _.concat([1, 2, 3], 4, [5]);

say('hello rollup' + arr);

const container = `<p class="container" style="color: red">内容</p>`;
document.getElementById('wrap').innerHTML = container;
