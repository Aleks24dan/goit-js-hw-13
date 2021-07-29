import Notiflix from 'notiflix';
import templateCard from './template/template-card.hbs';
import getRefs from './js/refs';
import './sass/main.scss';
import QueryService from './js/query-service';
const refs = getRefs();
const queryService = new QueryService();
let numberOfPages = 0;

Notiflix.Notify.init({
  distance: '5%',
  fontSize: '15px',
  width: '350px',
  showOnlyTheLastOne: true,
});


refs.form.addEventListener('submit', onSubmit);
// refs.moreBtn.addEventListener('click', onMoreBtn);



async function onSubmit(e) {

    e.preventDefault();
    window.addEventListener('scroll', onScroll);
    if (e.currentTarget.elements.searchQuery.value === '') {
        return Notiflix.Notify.warning('ops! Nothing is entered!'); 
    }
    
    queryService.query = e.currentTarget.elements.searchQuery.value.trim();
    queryService.resetPage();
    await queryService.fetchDate().then(({ hits, totalHits }) => {
        numberOfPages = Math.ceil(totalHits / queryService.limit);
        
        clearGallery();
       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
       renderGallery(hits);
    });

    // removeClassIshidden();
        
}

// function onMoreBtn(e) {
//     addClassIshidden();
//     try {
//        queryService.fetchDate().then(({hits}) => {
        // if (hits.length === 0) {
        //     return errorMessage('the end');
        // }
//            console.log(hits);
//         renderGallery(hits);
//        });
        
//     setTimeout(() => removeClassIshidden(), 1000); 
//     }
//     catch {
//         console.log('error');
//     }   

// }


async function onScroll() {
    
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 10) {
      
        try {
             await queryService.fetchDate().then(data => {
                 if (numberOfPages === queryService.page) {
                 window.removeEventListener('scroll', onScroll);    
                     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                     return
    
}
                renderGallery(data.hits);
            
           });
                       
        }
        
        catch (error) {
            console.log(error);
        }
        
    }
}


// function removeClassIshidden() {
//     refs.moreBtn.classList.remove('is-hiden');
// }

// function addClassIshidden() {
//     refs.moreBtn.classList.add('is-hiden');
// }




// You can type your text in String format.Notiflix.Notify.Failure('Qui timide rogat docet negare');
function renderGallery(t) {
    refs.gallery.insertAdjacentHTML('beforeend', templateCard(t));

}

function clearGallery() {
    refs.gallery.innerHTML = '';
}