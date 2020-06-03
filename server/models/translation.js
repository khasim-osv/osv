const mongoose = require("mongoose");

const TranslationSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    english: {
      type: String,
      required: true,
    },
    arabic: {
      type: String,
      required: true,
    },
  },
});

const Translation = mongoose.model("Translations", TranslationSchema);
module.exports = Translation;
