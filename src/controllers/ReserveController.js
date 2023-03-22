import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/Reserve';
import mongoose from 'mongoose';

class ReserveController {
  async index(req, res) {
    const { user_id } = req.headers;
    const reservas = await Reserve.find({ user_id: user_id }).populate('house');
    return res.json(reservas);
  }
  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;
    if (mongoose.Types.ObjectId.isValid(House_id)) {
    const house = await House.findById(House_id);
    if (!house) {
      return res.status(400).json({ error: "Essa casa nao existe!" });
    }
    }
    else {
      return res.status(406).json({ error: 'Codigo da casa invalido' });
    }
    if (house.status !== true) {
      return res.status(400).json({ error: "Solicitação indisponivel" });
    }
    const user = await User.findById(user_id);
    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ error: "Reserva nao permetida" });
    }
    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });
    await reserve.populate('house');
    await reserve.populate('user');
    return res.json(reserve);
  }
  async destroy(req, res) {
    const { reserve_id } = req.body;
    await Reserve.findByIdAndDelete({ _id: reserve_id });
    return res.send();
  }
}

export default new ReserveController();