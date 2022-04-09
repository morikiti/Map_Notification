#include <napi.h>
#include<iostream>
#include <math.h>
const double PI = 3.141592653589793;
//長半径（赤道半径）
const double Rx =  6378137.0;
//短半径（極半径）
const double Ry = 6356752.314245;
namespace demo {

Napi::Value AddMethod(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();
   // const double w = 700000.2222;

    // Check the number of arguments passed.
    if ( info.Length() < 4 ) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Check the argument type
    if ( ! info[0].IsNumber() || ! info[1].IsNumber() || ! info[2].IsNumber() || ! info[3].IsNumber() ) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    // 緯度の差
    double lat1 = info[0].As<Napi::Number>().DoubleValue();
    double lat2 = info[2].As<Napi::Number>().DoubleValue();
    double Ay = lat1*PI/180-lat2*PI/180;
    
    //経度の差
    double lng1 = info[1].As<Napi::Number>().DoubleValue();
    double lng2 = info[3].As<Napi::Number>().DoubleValue();
    double Ax = lng1*PI/180-lng2*PI/180;
   
    //２点の緯度の平均
    double P =(lat1*PI/180+lat2*PI/180)/2;
    
    //第一離心率
    double E2 = (pow(Ry,2)-pow(Rx,2))/pow(Ry,2);
   
    //子午線・卯酉線曲率半径の分母
    double W = sqrt(1-E2 * pow(sin(P),2));
  
    //卯酉線曲率半径
    double N = (Rx/W);
    //子午線曲率半径
    double M = (Rx*(1-E2))/pow(W,3);
    double result = sqrt(pow((Ay*M),2) + pow((Ax * N * cos(P)),2));
  
    Napi::Number answer = Napi::Number::New(env,result);

    return answer;
}

Napi::Object Initialize(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "add"), 
                Napi::Function::New(env, AddMethod));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Initialize)

} // namespace demo