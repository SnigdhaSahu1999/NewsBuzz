// shotrcut of creating react class based component is : "rce + enter"

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {

// hardcoded news json data
//   articles = [
//     {
//         "source": {
//             "id": "espn-cric-info",
//             "name": "ESPN Cric Info"
//         },
//         "author": null,
//         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//         "publishedAt": "2020-04-27T11:41:47Z",
//         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
//     },
//     {
//         "source": {
//             "id": "espn-cric-info",
//             "name": "ESPN Cric Info"
//         },
//         "author": null,
//         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//         "publishedAt": "2020-03-30T15:26:05Z",
//         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
//     }
// ]



static defaultProps = {
  country: 'in',
  pagesize: 8,
  category: 'general'
}

static propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}
// if we declare a constructor inside a class then it is must to call super()
  constructor(){
    super();
    console.log("Hello I am a constructor from News Component");
    this.state = {
      articles : [],
      loading : false,
      page    : 1
    }
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c81e1ddf436144f5ba1e57e9dae75e29&pageSize=${this.props.pageSize}`
    
    this.setState({loading: true});
    //FETCH API(a method) is used here to bring json data of the "news api"
    let data = await fetch(url);
    // parsing json data from news api
    let parsedData = await data.json()
    console.log(parsedData);
    // setting articles in the state
    this.setState({articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false})

  }

  // to bring data on "Previous" button click
   handlePrevClick = async ()=>{
    console.log("previous");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c81e1ddf436144f5ba1e57e9dae75e29&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      // parsing json data from news api
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page : this.state.page  - 1, 
        articles: parsedData.articles,
        loading: false
      })

  }

  // to bring data on "Previous" button click
   handleNextClick = async ()=>{
      console.log("next");
      if(!(this.state.page  + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

      
      //FETCH API(a method) is used here to bring json data of the "news api"
      //$ is used to give value to any variable
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c81e1ddf436144f5ba1e57e9dae75e29&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      // parsing json data from news api
      let parsedData = await data.json()
     
      this.setState({
        page : this.state.page  + 1, 
        articles: parsedData.articles,
        loading: false
      })
     }

    }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsBuzz - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">

        {/* the below line is for iterating through the articles array */}
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col md-4" key={element.url}>
            <NewsItem title={element.title ? element.title.slice(0, 45):""} 
            description={element.description ? element.description.slice(0, 88): ""} imageUrl={element.urlToImage}
          newsUrl={element.url}/>
          </div>

        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page  + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
