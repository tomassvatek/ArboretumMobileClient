/**
 * Replace placeholders in the string with given values. If a regex is not provided
 * it will use a default regex: /{[0-9]}|{[a-zA-Z]*}/. The default regex match placeholders
 * like this: api/{0}/{1} or api/{ownerId}/car/{id}.
 * 
 * @param string String with placeholders.
 * @param regex Optional regular expression for replacing placeholders.
 * @param values Values to replace placeholders.
 */
export const replaceStringPlaceholders = (string, regex, ...values) => {
    let reg = !regex ? /{[0-9]}|{[a-zA-Z]*}/ : regex;
    
    values.forEach((item, index) => {
      string = string.replace(reg, item); 
    });
    
    return string;
  }