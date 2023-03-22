import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';
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
    let house = {};
    if (mongoose.Types.ObjectId.isValid(house_id)) {
    house = await House.findById(house_id);
    if (!house) {
      return res.status(400).json({ error: "Essa casa nao existe!" });
    }
    }
    else {
      return res.status(406).json({ error: 'Codigo da casa invalido' });
    }
    if (House.status !== true) {
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
    if (mongoose.Types.ObjectId.isValid(reserve_id)) {
      const reserva = await House.findById(reserve_id);
      if (!reserva) {
        return res.status(400).json({ error: "Essa reserva nao existe" });
      } else {
        return res.status(406).json({ error: "Codigo da reserva invalido!" });
      }
    }
    await Reserve.findByIdAndDelete({ _id: reserve_id });
    return res.send();
  }
}

export default new ReserveController();