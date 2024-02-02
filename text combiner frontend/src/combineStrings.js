import axios from "axios";

function combineStrings(strings, percent) {
  return axios
    .post("http://localhost:8081/api/combine", { strings, percent })
    .then((response) => response.data);
}

export default combineStrings;
