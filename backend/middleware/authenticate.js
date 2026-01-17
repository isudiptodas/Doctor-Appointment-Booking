import jwt from 'jsonwebtoken';
import express from 'express';

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(403).json({
      success: false,
      message: 'token missing'
    });
  }

  const roleRoutes = {
    'USER' : '/api/user',
    'DOCTOR' : '/api/doctor',
    'HOSPITAL' : '/api/hospital',
  };

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role;
    req.userData = decoded;

    if(req.path.startsWith(roleRoutes[role])){
      next();
    }
    
    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    });
  }
  catch(err){
    console.log(err);
    return res.status(505).json({
      success: false,
      message: 'Error validating token'
    });
  }
}

