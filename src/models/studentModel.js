const mongoose = require("mongoose");
const slugify = require("slugify");

const testSchema = new mongoose.Schema({
  name: String,
  date: String,
});

const Tests = mongoose.model("Tests", testSchema);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: String,
});

const User = mongoose.model("User", userSchema);
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,

  fingerprint: String,
  user: userSchema,
  tests: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
//Documentation Middleware
studentSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Student = mongoose.model("Student", studentSchema);

module.exports = Tests;
module.exports = User;
module.exports = Student;
