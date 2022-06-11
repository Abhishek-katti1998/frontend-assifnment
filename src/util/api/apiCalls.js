import { candidateUrl } from "../../config";
const selectContent = (data) => {
  const obj = {};
  for (let i in data) {
    if (data[i]) {
      obj[i] = data[i];
    }
  }
  if (data.shortlisted === false) {
    obj.shortlisted = false;
  }
  return obj;
};
export const fetchCandidateDetails = async () => {
  return await (await fetch(candidateUrl)).json();
};
export const createCandidateDetails = async (data) => {
  let obj = selectContent(data);
  obj.shortlisted = true;
  return await (
    await fetch(`${candidateUrl}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
  ).json();
};
export const updateCandidateDetails = async (id, data) => {
  let obj = selectContent(data);

  return await (
    await fetch(`${candidateUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
  ).json();
};
export const deleteCandidateDetails = async () => {
  if (window.location.hash) {
    return await (
      await fetch(`${candidateUrl}/${window.location.hash.slice(1)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  }
};
