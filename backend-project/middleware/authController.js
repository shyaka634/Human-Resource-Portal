export function isAuth(req,res,next){

   try {

      if(!req.session || !req.session.userId){

         return res.status(401).json(
            "Not Authenticated"
         );
      }

      next();

   } catch(error){

      return res.status(500).json({
         error:error.message
      });
   }
}