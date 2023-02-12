const Student = require("./../models/studentModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.createNewStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
      status: "sucess",
      data: {
        newStudent,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "failed to create student",
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    //EXCEUTE
    const features = new APIFeatures(Student.find(), req.query)
      .filter()
      .sort()
      .pagenation();
    const students = await features.query;
    res.status(200).json({
      status: "sucess",
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    //console.log(JSON.stringify(req));
    const student = await Student.findById(req.params.id);

    res.status(200).json({
      status: "sucess",
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "sucess",
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "sucess",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
