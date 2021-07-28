const axios = require('axios').default;
export default class QueryService{
    constructor() {
        this.page = 1;
        this.limit = 40;
        this.inputValue = '';
        this.KEY_USER = '22553588-f2f977a115121553e22566e7d';
        this.BASE_URL = 'https://pixabay.com/api/';
        // this.totalHits = hitsNamber;
    }
    
 async fetchDate() {
    const url = `${this.BASE_URL}?key=${this.KEY_USER}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.limit}`;
     const response = await axios.get(url);
    this.incriment();
     if (response.data.hits < 1) {
          return;
      } else {
          return response.data;
    };
    }

    incriment() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

     get query(){
       return this.inputValue = newQuery;
    }

    set query(newQuery){
        this.inputValue = newQuery;
    }


      
}

