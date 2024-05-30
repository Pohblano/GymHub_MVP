import React from 'react'
import { View, Text} from 'react-native'

import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function DisplayStarRating({rating}:{rating:number}){
	const maxStars = 5;
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;
  const emptyStars = maxStars - filledStars - (halfStar ? 1 : 0);

  return (
    <View className='d-flex flex-row self-baseline' >
      {[...Array(filledStars)].map((_, index) => (
        <FontAwesome key={`filled-${index}`} name="star" size={16} color="#ffd700" />
      ))}

      {halfStar && <FontAwesome key="half" name="star-half" size={16} color="#ffd700" />}
      
	  {[...Array(emptyStars)].map((_, index) => (
        <FontAwesome key={`empty-${index}`} name="star-o" size={16} color="#ffd700" />
      ))}
    </View>
  )
}