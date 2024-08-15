import { ImageZoom, ContainerViewStrategy } from './lib';
import './style.css';

const BASE_HREF = import.meta.env.VITE_BASE_HREF;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="zoom-container">
      <img src="${BASE_HREF}/image-1.jpg" />
    </div>
  </div>
`;

const viewStrategy = new ContainerViewStrategy(document.querySelector('.zoom-container') as HTMLDivElement);
new ImageZoom(viewStrategy);
