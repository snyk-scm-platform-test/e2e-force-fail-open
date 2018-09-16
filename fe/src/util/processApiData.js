/**
 *
 * A function to produce an array of locations or municipalities
 * from /address/postcode-number endpoint's response if the same response returns
 * multiple locations or municipalities.
 *
 * @param {Object} res Response data from the API.
 * @param {string} key Response data key to process (municipality_name or location)
 *
 * @return {Array} an array with a list of unique locations or municipalities
 *
 */
export default (res, key) => {
  return res.reduce((list, data) => {
    if (list.indexOf(data[key]) < 0) list.push(data[key]);
    return list;
  }, []);
};
