import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateCreateRepair } from "./repairs.schema.js";
import { RepairService } from "./repairs.service.js";

export const findAllRepairs = async (req, res) => {
  try {
    const repairs = await RepairService.findAll();

    return res.status(200).json(repairs);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
};

export const createRepair = catchAsync(async (req, res) => {
  const { hasError, errorMessages, repairData } = validateCreateRepair(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const repair = await RepairService.create(repairData);

  return res.status(201).json(repair);
});

export const findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json(repair);
});

export const updateRepair = async (req, res) => {
  try {
    const { repair } = req;

    const repairUpdated = await RepairService.update(repair);

    return res.status(200).json(repairUpdated);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
};
export const deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await RepairService.delete(repair);

  return res.status(204).json(null);
});
