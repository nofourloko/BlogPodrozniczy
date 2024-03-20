export default function CheckFields(Place, Country, Continent, Description, Date, textFile, images) {
    if (typeof Place !== 'string' || Place.trim() === '') {
      return { error: 'Pole miejsce jest wymagane i musi być ciągiem znaków.' };
    }
  
    if (typeof Country !== 'string' || Country.trim() === '') {
      return { error: 'Pole kraj jest wymagane i musi być ciągiem znaków.' };
    }
  
    if (typeof Continent !== 'string' || Continent.trim() === '') {
      return { error: 'Pole kontynent jest wymagane i musi być ciągiem znaków.' };
    }
  
    if (typeof Description !== 'string' || Description.trim() === '') {
      return { error: 'Pole krótkiego opisu jest wymagane i musi być ciągiem znaków.' };
    }
  
    if (typeof Date !== 'string' || Date.trim() === '') {
      return { error: 'Pole daty jest wymagane i musi być ciągiem znaków.' };
    }


  
    return { error: null };
  }