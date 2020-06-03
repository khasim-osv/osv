import {
  getBanks_reducer,
  updateBanks_reducer,
  saveBanks_reducer,
} from "../Banks.reducer";
import {
  BanksActionTypes,
  IBanksData,
  initialState,
  getBanksInitialState,
} from "../Banks.actionTypes";

describe("<Banks /> reducer", () => {
  const data = {
    _id: "",
    logo: "",
    bank: "",
    url: "",
    type: "",
    isActive: true,
    success: false,
  };
  const mockData: IBanksData = {
    loading: false,
    success: true,
    data: data,
  };

  it("Banks reducer return the initial state", () => {
    expect(
      getBanks_reducer(undefined, {
        type: BanksActionTypes.GET_INITIAL_STATE,
      })
    ).toEqual(getBanksInitialState);
  });

  it('Banks reducer handle "BANKS_DATA" action', () => {
    expect(
      getBanks_reducer(initialState, {
        type: BanksActionTypes.BANKS_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Banks reducer handle "BANKS_DATA_SUCCEEDED" action', () => {
    expect(
      getBanks_reducer(initialState, {
        type: BanksActionTypes.BANKS_DATA_SUCCEEDED,
        GetBanks: { ...mockData, data: [data] },
      })
    ).toEqual({
      loading: false,
      ...mockData,
      data: [mockData.data],
    });
  });

  it('Banks reducer handle "BANKS_DATA_FAILED" action', () => {
    const mockData: IBanksData = {
      loading: false,
      success: false,
      data: [],
    };

    expect(
      getBanks_reducer(initialState, {
        type: BanksActionTypes.BANKS_DATA_FAILED,
        GetBanks: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Banks reducer handle "UPDATE_BANKS_DATA" action', () => {
    expect(
      updateBanks_reducer(initialState, {
        type: BanksActionTypes.UPDATE_BANKS_DATA,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('Banks reducer handle "UPDATE_BANKS_SUCCEEDED" action', () => {
    expect(
      updateBanks_reducer(initialState, {
        type: BanksActionTypes.UPDATE_BANKS_SUCCEEDED,
        EditBanks: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Banks reducer handle "UPDATE_BANKS_FAILED" action', () => {
    const mockData: IBanksData = {
      loading: false,
      success: false,
      data: [],
    };
    expect(
      updateBanks_reducer(initialState, {
        type: BanksActionTypes.UPDATE_BANKS_FAILED,
        EditBanks: mockData,
      })
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Banks reducer handle "SAVE_BANKS_DATA" action', () => {
    expect(
      saveBanks_reducer({}, { type: BanksActionTypes.SAVE_BANKS_DATA })
    ).toEqual({
      loading: true,
    });
  });

  it('Banks reducer handle "SAVE_BANKS_SUCCEEDED" action', () => {
    expect(
      saveBanks_reducer(
        {},
        {
          type: BanksActionTypes.SAVE_BANKS_SUCCEEDED,
          SaveBanks: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });

  it('Banks reducer handle "SAVE_BANKS_FAILED" action', () => {
    const mockData = { loading: false, success: false, data: [] };
    expect(
      saveBanks_reducer(
        {},
        {
          type: BanksActionTypes.SAVE_BANKS_FAILED,
          SaveBanks: mockData,
        }
      )
    ).toEqual({
      loading: false,
      ...mockData,
    });
  });
});
