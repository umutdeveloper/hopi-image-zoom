import { ImageZoom, ContainerViewStrategy } from './lib';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="zoom-container">
      <img src="/image-1.jpg" />
    </div>
  </div>
`;

const viewStrategy = new ContainerViewStrategy(document.querySelector('.zoom-container') as HTMLDivElement);
new ImageZoom(viewStrategy);