import './sass/style.scss';
import Swiper from './js/components/Swiper/Swiper';
import '../node_modules/swiper/css/swiper.css';
import Slide from './js/components/Slide/Slide';
import Form from './js/components/Form/Form';



const slide = new Slide();
slide.startRequest();
slide.toSearch();
slide.getNextPage();

Form.clearForm();
