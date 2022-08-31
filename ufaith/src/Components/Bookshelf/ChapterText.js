import React from 'react';
import ApocryphaData from './apocryphaJSON.json';
import BibleData from './bibleJSON.json';
import QuranData from './quranJSON.json'



class ChapterText extends React.Component {
    

render() {
const data = this.props.data || []; 
const bookChoice = this.props.bookChoice;
const chapterChoice = this.props.chapterChoice; 

     return (
        <div className="container">
            <div className="verses">
                { data.filter(bit => bit.bookName===bookChoice && bit.Chapter===parseInt(chapterChoice)).map(FilteredBit => {
                    return(
                        <>
                        <sup key={FilteredBit.bookName+FilteredBit.Chapter+FilteredBit.Verse} className="bit">{FilteredBit.Verse}</sup><span>{FilteredBit.Text} </span>
                        </>
                    )   
                }   
                )}
            </div>    
        </div>
     
 )}
}
  
  export default ChapterText;



