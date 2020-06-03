import { connect } from "react-redux";
import { Dispatch } from "redux";
import Translations from "./Translations.component";
import {
  get_translation_data,
  update_translation_data,
  edit_closed,
  delete_translation_data,
  delete_closed,
  translation_data_changed,
} from "./Translations.action";
import {
  ITranslationDetails,
  IReduxTranslationState,
} from "./Translation.actionTypes";
import { ISearchKey } from "../../../common/search/search.component";

export const mapStateToProps = (state: IReduxTranslationState) => {
  return {
    getTranslations: state.Translation.GetTranslations,
    editTranslation: state.Translation.EditTranslation,
    deleteTranslation: state.Translation.DeleteTranslation,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getTranslationData: (
      searchKey?: ISearchKey,
      page?: number,
      pageSize?: number
    ) => dispatch(get_translation_data(searchKey, page, pageSize)),
    updateTranslationData: (payload: ITranslationDetails) =>
      dispatch(update_translation_data(payload)),
    deleteTranslationData: (Id: string) =>
      dispatch(delete_translation_data(Id)),
    popupEditClose: () => dispatch(edit_closed()),
    popupDeleteClose: () => dispatch(delete_closed()),
    translationDataChanged: (data: ITranslationDetails) =>
      dispatch(translation_data_changed(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Translations as any);
