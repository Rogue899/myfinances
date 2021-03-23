import common from "./common";

const COMPANY_URL = "/company";

const crudOperations = (base) => ({
  getAll(params) {
    return common.get(`${base}`, { params });
  },
  get(id) {
    return common.get(`${base}/${id}`);
  },
  add(toCreate) {
    return common.post(`${base}`, toCreate);
  },
  update(id, toUpdate) {
    return common.post(`${base}/${id}`, toUpdate);
  },
  remove(id) {
    return common.delete(`${base}/${id}`);
  },
});

const api = {
  balances: {
    ...crudOperations(`${COMPANY_URL}`),
    getCompany: (companyId) => common.get(`${COMPANY_URL}/${companyId}`),
    updateBalance: (companyId, data) =>
      common.put(`${COMPANY_URL}/${companyId}`, data),
    // getBalance: (companyId, id) =>
    //   common.get(`${COMPANY_URL}/${companyId}/${BALANCE_URL}/${id}`),
  },
};

export default api;
