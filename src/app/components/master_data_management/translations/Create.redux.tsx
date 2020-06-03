import { connect } from "react-redux";
import Create from "./Create.component";
import { Dispatch } from "redux";
import { save_translation_data, save_closed } from "./Translations.action";
import {
  ITranslationDetails,
  IReduxTranslationState,
} from "./Translation.actionTypes";

export const mapStateToProps = (state: IReduxTranslationState) => {
  return {
    saveTranslation: state.Translation.SaveTranslation,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveTranslationData: (payload: ITranslationDetails) =>
      dispatch(save_translation_data(payload)),
    saveClosed: () => dispatch(save_closed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
