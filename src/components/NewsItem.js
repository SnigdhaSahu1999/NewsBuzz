import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    // props in class based components
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl? imageUrl:"https://www.veganfirst.com/media/upload/article/main/raw_vegan.png"} className="card-img-top" alt="..."/>
            <div className="card-body">

              {/* instead we can write this.props.title */}
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
