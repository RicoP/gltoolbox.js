"use strict"; 
var gl; 

// gl-matrix 1.2.4 - https://github.com/toji/gl-matrix/blob/master/LICENSE.md
(function(a){a.glMatrixArrayType=a.MatrixArray=null;a.vec3={};a.mat3={};a.mat4={};a.quat4={};a.setMatrixArrayType=function(a){return glMatrixArrayType=MatrixArray=a};a.determineMatrixArrayType=function(){return setMatrixArrayType("undefined"!==typeof Float32Array?Float32Array:Array)};determineMatrixArrayType()})("undefined"!=typeof exports?global:this);vec3.create=function(a){var b=new MatrixArray(3);a?(b[0]=a[0],b[1]=a[1],b[2]=a[2]):b[0]=b[1]=b[2]=0;return b};
vec3.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];return b};vec3.add=function(a,b,c){if(!c||a===c)return a[0]+=b[0],a[1]+=b[1],a[2]+=b[2],a;c[0]=a[0]+b[0];c[1]=a[1]+b[1];c[2]=a[2]+b[2];return c};vec3.subtract=function(a,b,c){if(!c||a===c)return a[0]-=b[0],a[1]-=b[1],a[2]-=b[2],a;c[0]=a[0]-b[0];c[1]=a[1]-b[1];c[2]=a[2]-b[2];return c};vec3.multiply=function(a,b,c){if(!c||a===c)return a[0]*=b[0],a[1]*=b[1],a[2]*=b[2],a;c[0]=a[0]*b[0];c[1]=a[1]*b[1];c[2]=a[2]*b[2];return c};
vec3.negate=function(a,b){b||(b=a);b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];return b};vec3.scale=function(a,b,c){if(!c||a===c)return a[0]*=b,a[1]*=b,a[2]*=b,a;c[0]=a[0]*b;c[1]=a[1]*b;c[2]=a[2]*b;return c};vec3.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=Math.sqrt(c*c+d*d+e*e);if(g){if(1===g)return b[0]=c,b[1]=d,b[2]=e,b}else return b[0]=0,b[1]=0,b[2]=0,b;g=1/g;b[0]=c*g;b[1]=d*g;b[2]=e*g;return b};
vec3.cross=function(a,b,c){c||(c=a);var d=a[0],e=a[1],a=a[2],g=b[0],f=b[1],b=b[2];c[0]=e*b-a*f;c[1]=a*g-d*b;c[2]=d*f-e*g;return c};vec3.length=function(a){var b=a[0],c=a[1],a=a[2];return Math.sqrt(b*b+c*c+a*a)};vec3.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};vec3.direction=function(a,b,c){c||(c=a);var d=a[0]-b[0],e=a[1]-b[1],a=a[2]-b[2],b=Math.sqrt(d*d+e*e+a*a);if(!b)return c[0]=0,c[1]=0,c[2]=0,c;b=1/b;c[0]=d*b;c[1]=e*b;c[2]=a*b;return c};
vec3.lerp=function(a,b,c,d){d||(d=a);d[0]=a[0]+c*(b[0]-a[0]);d[1]=a[1]+c*(b[1]-a[1]);d[2]=a[2]+c*(b[2]-a[2]);return d};vec3.dist=function(a,b){var c=b[0]-a[0],d=b[1]-a[1],e=b[2]-a[2];return Math.sqrt(c*c+d*d+e*e)};
vec3.unproject=function(a,b,c,d,e){e||(e=a);var g=mat4.create(),f=new MatrixArray(4);f[0]=2*(a[0]-d[0])/d[2]-1;f[1]=2*(a[1]-d[1])/d[3]-1;f[2]=2*a[2]-1;f[3]=1;mat4.multiply(c,b,g);if(!mat4.inverse(g))return null;mat4.multiplyVec4(g,f);if(0===f[3])return null;e[0]=f[0]/f[3];e[1]=f[1]/f[3];e[2]=f[2]/f[3];return e};vec3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+"]"};
mat3.create=function(a){var b=new MatrixArray(9);a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8]);return b};mat3.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];return b};mat3.identity=function(a){a||(a=mat3.create());a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=1;a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a};
mat3.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[5];a[1]=a[3];a[2]=a[6];a[3]=c;a[5]=a[7];a[6]=d;a[7]=e;return a}b[0]=a[0];b[1]=a[3];b[2]=a[6];b[3]=a[1];b[4]=a[4];b[5]=a[7];b[6]=a[2];b[7]=a[5];b[8]=a[8];return b};mat3.toMat4=function(a,b){b||(b=mat4.create());b[15]=1;b[14]=0;b[13]=0;b[12]=0;b[11]=0;b[10]=a[8];b[9]=a[7];b[8]=a[6];b[7]=0;b[6]=a[5];b[5]=a[4];b[4]=a[3];b[3]=0;b[2]=a[2];b[1]=a[1];b[0]=a[0];return b};
mat3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+"]"};mat4.create=function(a){var b=new MatrixArray(16);a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9],b[10]=a[10],b[11]=a[11],b[12]=a[12],b[13]=a[13],b[14]=a[14],b[15]=a[15]);return b};
mat4.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return b};mat4.identity=function(a){a||(a=mat4.create());a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};
mat4.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[3],g=a[6],f=a[7],h=a[11];a[1]=a[4];a[2]=a[8];a[3]=a[12];a[4]=c;a[6]=a[9];a[7]=a[13];a[8]=d;a[9]=g;a[11]=a[14];a[12]=e;a[13]=f;a[14]=h;return a}b[0]=a[0];b[1]=a[4];b[2]=a[8];b[3]=a[12];b[4]=a[1];b[5]=a[5];b[6]=a[9];b[7]=a[13];b[8]=a[2];b[9]=a[6];b[10]=a[10];b[11]=a[14];b[12]=a[3];b[13]=a[7];b[14]=a[11];b[15]=a[15];return b};
mat4.determinant=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],g=a[4],f=a[5],h=a[6],i=a[7],j=a[8],k=a[9],l=a[10],n=a[11],o=a[12],m=a[13],p=a[14],a=a[15];return o*k*h*e-j*m*h*e-o*f*l*e+g*m*l*e+j*f*p*e-g*k*p*e-o*k*d*i+j*m*d*i+o*c*l*i-b*m*l*i-j*c*p*i+b*k*p*i+o*f*d*n-g*m*d*n-o*c*h*n+b*m*h*n+g*c*p*n-b*f*p*n-j*f*d*a+g*k*d*a+j*c*h*a-b*k*h*a-g*c*l*a+b*f*l*a};
mat4.inverse=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=a[3],f=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],n=a[10],o=a[11],m=a[12],p=a[13],r=a[14],s=a[15],A=c*h-d*f,B=c*i-e*f,t=c*j-g*f,u=d*i-e*h,v=d*j-g*h,w=e*j-g*i,x=k*p-l*m,y=k*r-n*m,z=k*s-o*m,C=l*r-n*p,D=l*s-o*p,E=n*s-o*r,q=A*E-B*D+t*C+u*z-v*y+w*x;if(!q)return null;q=1/q;b[0]=(h*E-i*D+j*C)*q;b[1]=(-d*E+e*D-g*C)*q;b[2]=(p*w-r*v+s*u)*q;b[3]=(-l*w+n*v-o*u)*q;b[4]=(-f*E+i*z-j*y)*q;b[5]=(c*E-e*z+g*y)*q;b[6]=(-m*w+r*t-s*B)*q;b[7]=(k*w-n*t+o*B)*q;b[8]=
(f*D-h*z+j*x)*q;b[9]=(-c*D+d*z-g*x)*q;b[10]=(m*v-p*t+s*A)*q;b[11]=(-k*v+l*t-o*A)*q;b[12]=(-f*C+h*y-i*x)*q;b[13]=(c*C-d*y+e*x)*q;b[14]=(-m*u+p*B-r*A)*q;b[15]=(k*u-l*B+n*A)*q;return b};mat4.toRotationMat=function(a,b){b||(b=mat4.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};
mat4.toMat3=function(a,b){b||(b=mat3.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[4];b[4]=a[5];b[5]=a[6];b[6]=a[8];b[7]=a[9];b[8]=a[10];return b};mat4.toInverseMat3=function(a,b){var c=a[0],d=a[1],e=a[2],g=a[4],f=a[5],h=a[6],i=a[8],j=a[9],k=a[10],l=k*f-h*j,n=-k*g+h*i,o=j*g-f*i,m=c*l+d*n+e*o;if(!m)return null;m=1/m;b||(b=mat3.create());b[0]=l*m;b[1]=(-k*d+e*j)*m;b[2]=(h*d-e*f)*m;b[3]=n*m;b[4]=(k*c-e*i)*m;b[5]=(-h*c+e*g)*m;b[6]=o*m;b[7]=(-j*c+d*i)*m;b[8]=(f*c-d*g)*m;return b};
mat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],g=a[2],f=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],n=a[9],o=a[10],m=a[11],p=a[12],r=a[13],s=a[14],a=a[15],A=b[0],B=b[1],t=b[2],u=b[3],v=b[4],w=b[5],x=b[6],y=b[7],z=b[8],C=b[9],D=b[10],E=b[11],q=b[12],F=b[13],G=b[14],b=b[15];c[0]=A*d+B*h+t*l+u*p;c[1]=A*e+B*i+t*n+u*r;c[2]=A*g+B*j+t*o+u*s;c[3]=A*f+B*k+t*m+u*a;c[4]=v*d+w*h+x*l+y*p;c[5]=v*e+w*i+x*n+y*r;c[6]=v*g+w*j+x*o+y*s;c[7]=v*f+w*k+x*m+y*a;c[8]=z*d+C*h+D*l+E*p;c[9]=z*e+C*i+D*n+E*r;c[10]=z*g+C*
j+D*o+E*s;c[11]=z*f+C*k+D*m+E*a;c[12]=q*d+F*h+G*l+b*p;c[13]=q*e+F*i+G*n+b*r;c[14]=q*g+F*j+G*o+b*s;c[15]=q*f+F*k+G*m+b*a;return c};mat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],b=b[2];c[0]=a[0]*d+a[4]*e+a[8]*b+a[12];c[1]=a[1]*d+a[5]*e+a[9]*b+a[13];c[2]=a[2]*d+a[6]*e+a[10]*b+a[14];return c};
mat4.multiplyVec4=function(a,b,c){c||(c=b);var d=b[0],e=b[1],g=b[2],b=b[3];c[0]=a[0]*d+a[4]*e+a[8]*g+a[12]*b;c[1]=a[1]*d+a[5]*e+a[9]*g+a[13]*b;c[2]=a[2]*d+a[6]*e+a[10]*g+a[14]*b;c[3]=a[3]*d+a[7]*e+a[11]*g+a[15]*b;return c};
mat4.translate=function(a,b,c){var d=b[0],e=b[1],b=b[2],g,f,h,i,j,k,l,n,o,m,p,r;if(!c||a===c)return a[12]=a[0]*d+a[4]*e+a[8]*b+a[12],a[13]=a[1]*d+a[5]*e+a[9]*b+a[13],a[14]=a[2]*d+a[6]*e+a[10]*b+a[14],a[15]=a[3]*d+a[7]*e+a[11]*b+a[15],a;g=a[0];f=a[1];h=a[2];i=a[3];j=a[4];k=a[5];l=a[6];n=a[7];o=a[8];m=a[9];p=a[10];r=a[11];c[0]=g;c[1]=f;c[2]=h;c[3]=i;c[4]=j;c[5]=k;c[6]=l;c[7]=n;c[8]=o;c[9]=m;c[10]=p;c[11]=r;c[12]=g*d+j*e+o*b+a[12];c[13]=f*d+k*e+m*b+a[13];c[14]=h*d+l*e+p*b+a[14];c[15]=i*d+n*e+r*b+a[15];
return c};mat4.scale=function(a,b,c){var d=b[0],e=b[1],b=b[2];if(!c||a===c)return a[0]*=d,a[1]*=d,a[2]*=d,a[3]*=d,a[4]*=e,a[5]*=e,a[6]*=e,a[7]*=e,a[8]*=b,a[9]*=b,a[10]*=b,a[11]*=b,a;c[0]=a[0]*d;c[1]=a[1]*d;c[2]=a[2]*d;c[3]=a[3]*d;c[4]=a[4]*e;c[5]=a[5]*e;c[6]=a[6]*e;c[7]=a[7]*e;c[8]=a[8]*b;c[9]=a[9]*b;c[10]=a[10]*b;c[11]=a[11]*b;c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15];return c};
mat4.rotate=function(a,b,c,d){var e=c[0],g=c[1],c=c[2],f=Math.sqrt(e*e+g*g+c*c),h,i,j,k,l,n,o,m,p,r,s,A,B,t,u,v,w,x,y,z;if(!f)return null;1!==f&&(f=1/f,e*=f,g*=f,c*=f);h=Math.sin(b);i=Math.cos(b);j=1-i;b=a[0];f=a[1];k=a[2];l=a[3];n=a[4];o=a[5];m=a[6];p=a[7];r=a[8];s=a[9];A=a[10];B=a[11];t=e*e*j+i;u=g*e*j+c*h;v=c*e*j-g*h;w=e*g*j-c*h;x=g*g*j+i;y=c*g*j+e*h;z=e*c*j+g*h;e=g*c*j-e*h;g=c*c*j+i;d?a!==d&&(d[12]=a[12],d[13]=a[13],d[14]=a[14],d[15]=a[15]):d=a;d[0]=b*t+n*u+r*v;d[1]=f*t+o*u+s*v;d[2]=k*t+m*u+A*
v;d[3]=l*t+p*u+B*v;d[4]=b*w+n*x+r*y;d[5]=f*w+o*x+s*y;d[6]=k*w+m*x+A*y;d[7]=l*w+p*x+B*y;d[8]=b*z+n*e+r*g;d[9]=f*z+o*e+s*g;d[10]=k*z+m*e+A*g;d[11]=l*z+p*e+B*g;return d};mat4.rotateX=function(a,b,c){var d=Math.sin(b),b=Math.cos(b),e=a[4],g=a[5],f=a[6],h=a[7],i=a[8],j=a[9],k=a[10],l=a[11];c?a!==c&&(c[0]=a[0],c[1]=a[1],c[2]=a[2],c[3]=a[3],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[4]=e*b+i*d;c[5]=g*b+j*d;c[6]=f*b+k*d;c[7]=h*b+l*d;c[8]=e*-d+i*b;c[9]=g*-d+j*b;c[10]=f*-d+k*b;c[11]=h*-d+l*b;return c};
mat4.rotateY=function(a,b,c){var d=Math.sin(b),b=Math.cos(b),e=a[0],g=a[1],f=a[2],h=a[3],i=a[8],j=a[9],k=a[10],l=a[11];c?a!==c&&(c[4]=a[4],c[5]=a[5],c[6]=a[6],c[7]=a[7],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[0]=e*b+i*-d;c[1]=g*b+j*-d;c[2]=f*b+k*-d;c[3]=h*b+l*-d;c[8]=e*d+i*b;c[9]=g*d+j*b;c[10]=f*d+k*b;c[11]=h*d+l*b;return c};
mat4.rotateZ=function(a,b,c){var d=Math.sin(b),b=Math.cos(b),e=a[0],g=a[1],f=a[2],h=a[3],i=a[4],j=a[5],k=a[6],l=a[7];c?a!==c&&(c[8]=a[8],c[9]=a[9],c[10]=a[10],c[11]=a[11],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[0]=e*b+i*d;c[1]=g*b+j*d;c[2]=f*b+k*d;c[3]=h*b+l*d;c[4]=e*-d+i*b;c[5]=g*-d+j*b;c[6]=f*-d+k*b;c[7]=h*-d+l*b;return c};
mat4.frustum=function(a,b,c,d,e,g,f){f||(f=mat4.create());var h=b-a,i=d-c,j=g-e;f[0]=2*e/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=2*e/i;f[6]=0;f[7]=0;f[8]=(b+a)/h;f[9]=(d+c)/i;f[10]=-(g+e)/j;f[11]=-1;f[12]=0;f[13]=0;f[14]=-(2*g*e)/j;f[15]=0;return f};mat4.perspective=function(a,b,c,d,e){a=c*Math.tan(a*Math.PI/360);b*=a;return mat4.frustum(-b,b,-a,a,c,d,e)};
mat4.ortho=function(a,b,c,d,e,g,f){f||(f=mat4.create());var h=b-a,i=d-c,j=g-e;f[0]=2/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=2/i;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=-2/j;f[11]=0;f[12]=-(a+b)/h;f[13]=-(d+c)/i;f[14]=-(g+e)/j;f[15]=1;return f};
mat4.lookAt=function(a,b,c,d){d||(d=mat4.create());var e,g,f,h,i,j,k,l,n=a[0],o=a[1],a=a[2];f=c[0];h=c[1];g=c[2];k=b[0];c=b[1];e=b[2];if(n===k&&o===c&&a===e)return mat4.identity(d);b=n-k;c=o-c;k=a-e;l=1/Math.sqrt(b*b+c*c+k*k);b*=l;c*=l;k*=l;e=h*k-g*c;g=g*b-f*k;f=f*c-h*b;(l=Math.sqrt(e*e+g*g+f*f))?(l=1/l,e*=l,g*=l,f*=l):f=g=e=0;h=c*f-k*g;i=k*e-b*f;j=b*g-c*e;(l=Math.sqrt(h*h+i*i+j*j))?(l=1/l,h*=l,i*=l,j*=l):j=i=h=0;d[0]=e;d[1]=h;d[2]=b;d[3]=0;d[4]=g;d[5]=i;d[6]=c;d[7]=0;d[8]=f;d[9]=j;d[10]=k;d[11]=
0;d[12]=-(e*n+g*o+f*a);d[13]=-(h*n+i*o+j*a);d[14]=-(b*n+c*o+k*a);d[15]=1;return d};mat4.fromRotationTranslation=function(a,b,c){c||(c=mat4.create());var d=a[0],e=a[1],g=a[2],f=a[3],h=d+d,i=e+e,j=g+g,a=d*h,k=d*i,d=d*j,l=e*i,e=e*j,g=g*j,h=f*h,i=f*i,f=f*j;c[0]=1-(l+g);c[1]=k+f;c[2]=d-i;c[3]=0;c[4]=k-f;c[5]=1-(a+g);c[6]=e+h;c[7]=0;c[8]=d+i;c[9]=e-h;c[10]=1-(a+l);c[11]=0;c[12]=b[0];c[13]=b[1];c[14]=b[2];c[15]=1;return c};
mat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+"]"};quat4.create=function(a){var b=new MatrixArray(4);a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3]);return b};quat4.set=function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];return b};
quat4.calculateW=function(a,b){var c=a[0],d=a[1],e=a[2];if(!b||a===b)return a[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e)),a;b[0]=c;b[1]=d;b[2]=e;b[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e));return b};quat4.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]};quat4.inverse=function(a,b){var c=a[0],d=a[1],e=a[2],g=a[3],c=(c=c*c+d*d+e*e+g*g)?1/c:0;if(!b||a===b)return a[0]*=-c,a[1]*=-c,a[2]*=-c,a[3]*=c,a;b[0]=-a[0]*c;b[1]=-a[1]*c;b[2]=-a[2]*c;b[3]=a[3]*c;return b};
quat4.conjugate=function(a,b){if(!b||a===b)return a[0]*=-1,a[1]*=-1,a[2]*=-1,a;b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];b[3]=a[3];return b};quat4.length=function(a){var b=a[0],c=a[1],d=a[2],a=a[3];return Math.sqrt(b*b+c*c+d*d+a*a)};quat4.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],g=a[3],f=Math.sqrt(c*c+d*d+e*e+g*g);if(0===f)return b[0]=0,b[1]=0,b[2]=0,b[3]=0,b;f=1/f;b[0]=c*f;b[1]=d*f;b[2]=e*f;b[3]=g*f;return b};
quat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],g=a[2],a=a[3],f=b[0],h=b[1],i=b[2],b=b[3];c[0]=d*b+a*f+e*i-g*h;c[1]=e*b+a*h+g*f-d*i;c[2]=g*b+a*i+d*h-e*f;c[3]=a*b-d*f-e*h-g*i;return c};quat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],g=b[2],b=a[0],f=a[1],h=a[2],a=a[3],i=a*d+f*g-h*e,j=a*e+h*d-b*g,k=a*g+b*e-f*d,d=-b*d-f*e-h*g;c[0]=i*a+d*-b+j*-h-k*-f;c[1]=j*a+d*-f+k*-b-i*-h;c[2]=k*a+d*-h+i*-f-j*-b;return c};
quat4.toMat3=function(a,b){b||(b=mat3.create());var c=a[0],d=a[1],e=a[2],g=a[3],f=c+c,h=d+d,i=e+e,j=c*f,k=c*h,c=c*i,l=d*h,d=d*i,e=e*i,f=g*f,h=g*h,g=g*i;b[0]=1-(l+e);b[1]=k+g;b[2]=c-h;b[3]=k-g;b[4]=1-(j+e);b[5]=d+f;b[6]=c+h;b[7]=d-f;b[8]=1-(j+l);return b};
quat4.toMat4=function(a,b){b||(b=mat4.create());var c=a[0],d=a[1],e=a[2],g=a[3],f=c+c,h=d+d,i=e+e,j=c*f,k=c*h,c=c*i,l=d*h,d=d*i,e=e*i,f=g*f,h=g*h,g=g*i;b[0]=1-(l+e);b[1]=k+g;b[2]=c-h;b[3]=0;b[4]=k-g;b[5]=1-(j+e);b[6]=d+f;b[7]=0;b[8]=c+h;b[9]=d-f;b[10]=1-(j+l);b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};
quat4.slerp=function(a,b,c,d){d||(d=a);var e=a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3],g,f;if(1<=Math.abs(e))return d!==a&&(d[0]=a[0],d[1]=a[1],d[2]=a[2],d[3]=a[3]),d;g=Math.acos(e);f=Math.sqrt(1-e*e);if(0.001>Math.abs(f))return d[0]=0.5*a[0]+0.5*b[0],d[1]=0.5*a[1]+0.5*b[1],d[2]=0.5*a[2]+0.5*b[2],d[3]=0.5*a[3]+0.5*b[3],d;e=Math.sin((1-c)*g)/f;c=Math.sin(c*g)/f;d[0]=a[0]*e+b[0]*c;d[1]=a[1]*e+b[1]*c;d[2]=a[2]*e+b[2]*c;d[3]=a[3]*e+b[3]*c;return d};
quat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+"]"};


var UTIL = (function() {
"use strict"; 

/*
Copyright (c) 2012 Rico Possienka 

This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:

 - The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
 - Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
 - This notice may not be removed or altered from any source distribution.
*/
if(window["WebGLRenderingContext"]) {
	window["WebGLRenderingContext"]["prototype"]["getSafeContext"] = 
	(function (){
		"use strict"; 
		
		// var METHODS ... 
		/* this is autogenerated. Don't edit by hand! */ 
		var METHODS = 
		{"releaseShaderCompiler":[{"args":[]}],"getContextAttributes":[{"args":[]}],"isContextLost":[{"args":[]}],"getSupportedExtensions":[{"args":[]}],"getExtension":[{"args":[{"name":"name","type":"DOMString"}]}],"activeTexture":[{"args":[{"name":"texture","type":"GLenum"}]}],"attachShader":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"shader","type":"WebGLShader"}]}],"bindAttribLocation":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"index","type":"GLuint"},{"name":"name","type":"DOMString"}]}],"bindBuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"buffer","type":"WebGLBuffer"}]}],"bindFramebuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"framebuffer","type":"WebGLFramebuffer"}]}],"bindRenderbuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"bindTexture":[{"args":[{"name":"target","type":"GLenum"},{"name":"texture","type":"WebGLTexture"}]}],"blendColor":[{"args":[{"name":"red","type":"GLclampf"},{"name":"green","type":"GLclampf"},{"name":"blue","type":"GLclampf"},{"name":"alpha","type":"GLclampf"}]}],"blendEquation":[{"args":[{"name":"mode","type":"GLenum"}]}],"blendEquationSeparate":[{"args":[{"name":"modeRGB","type":"GLenum"},{"name":"modeAlpha","type":"GLenum"}]}],"blendFunc":[{"args":[{"name":"sfactor","type":"GLenum"},{"name":"dfactor","type":"GLenum"}]}],"blendFuncSeparate":[{"args":[{"name":"srcRGB","type":"GLenum"},{"name":"dstRGB","type":"GLenum"},{"name":"srcAlpha","type":"GLenum"},{"name":"dstAlpha","type":"GLenum"}]}],"bufferData":[{"args":[{"name":"target","type":"GLenum"},{"name":"size","type":"GLsizeiptr"},{"name":"usage","type":"GLenum"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"data","type":"ArrayBufferView"},{"name":"usage","type":"GLenum"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"data","type":"ArrayBuffer"},{"name":"usage","type":"GLenum"}]}],"bufferSubData":[{"args":[{"name":"target","type":"GLenum"},{"name":"offset","type":"GLintptr"},{"name":"data","type":"ArrayBufferView"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"offset","type":"GLintptr"},{"name":"data","type":"ArrayBuffer"}]}],"checkFramebufferStatus":[{"args":[{"name":"target","type":"GLenum"}]}],"clear":[{"args":[{"name":"mask","type":"GLbitfield"}]}],"clearColor":[{"args":[{"name":"red","type":"GLclampf"},{"name":"green","type":"GLclampf"},{"name":"blue","type":"GLclampf"},{"name":"alpha","type":"GLclampf"}]}],"clearDepth":[{"args":[{"name":"depth","type":"GLclampf"}]}],"clearStencil":[{"args":[{"name":"s","type":"GLint"}]}],"colorMask":[{"args":[{"name":"red","type":"GLboolean"},{"name":"green","type":"GLboolean"},{"name":"blue","type":"GLboolean"},{"name":"alpha","type":"GLboolean"}]}],"compileShader":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"copyTexImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"border","type":"GLint"}]}],"copyTexSubImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}],"createBuffer":[{"args":[]}],"createFramebuffer":[{"args":[]}],"createProgram":[{"args":[]}],"createRenderbuffer":[{"args":[]}],"createShader":[{"args":[{"name":"type","type":"GLenum"}]}],"createTexture":[{"args":[]}],"cullFace":[{"args":[{"name":"mode","type":"GLenum"}]}],"deleteBuffer":[{"args":[{"name":"buffer","type":"WebGLBuffer"}]}],"deleteFramebuffer":[{"args":[{"name":"framebuffer","type":"WebGLFramebuffer"}]}],"deleteProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"deleteRenderbuffer":[{"args":[{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"deleteShader":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"deleteTexture":[{"args":[{"name":"texture","type":"WebGLTexture"}]}],"depthFunc":[{"args":[{"name":"func","type":"GLenum"}]}],"depthMask":[{"args":[{"name":"flag","type":"GLboolean"}]}],"depthRange":[{"args":[{"name":"zNear","type":"GLclampf"},{"name":"zFar","type":"GLclampf"}]}],"detachShader":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"shader","type":"WebGLShader"}]}],"disable":[{"args":[{"name":"cap","type":"GLenum"}]}],"disableVertexAttribArray":[{"args":[{"name":"index","type":"GLuint"}]}],"drawArrays":[{"args":[{"name":"mode","type":"GLenum"},{"name":"first","type":"GLint"},{"name":"count","type":"GLsizei"}]}],"drawElements":[{"args":[{"name":"mode","type":"GLenum"},{"name":"count","type":"GLsizei"},{"name":"type","type":"GLenum"},{"name":"offset","type":"GLintptr"}]}],"enable":[{"args":[{"name":"cap","type":"GLenum"}]}],"enableVertexAttribArray":[{"args":[{"name":"index","type":"GLuint"}]}],"finish":[{"args":[]}],"flush":[{"args":[]}],"framebufferRenderbuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"attachment","type":"GLenum"},{"name":"renderbuffertarget","type":"GLenum"},{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"framebufferTexture2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"attachment","type":"GLenum"},{"name":"textarget","type":"GLenum"},{"name":"texture","type":"WebGLTexture"},{"name":"level","type":"GLint"}]}],"frontFace":[{"args":[{"name":"mode","type":"GLenum"}]}],"generateMipmap":[{"args":[{"name":"target","type":"GLenum"}]}],"getActiveAttrib":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"index","type":"GLuint"}]}],"getActiveUniform":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"index","type":"GLuint"}]}],"getAttachedShaders":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"getAttribLocation":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"name","type":"DOMString"}]}],"getParameter":[{"args":[{"name":"pname","type":"GLenum"}]}],"getBufferParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getError":[{"args":[]}],"getFramebufferAttachmentParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"attachment","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getProgramParameter":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"pname","type":"GLenum"}]}],"getProgramInfoLog":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"getRenderbufferParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getShaderParameter":[{"args":[{"name":"shader","type":"WebGLShader"},{"name":"pname","type":"GLenum"}]}],"getShaderInfoLog":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"getShaderSource":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"getTexParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getUniform":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"location","type":"WebGLUniformLocation"}]}],"getUniformLocation":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"name","type":"DOMString"}]}],"getVertexAttrib":[{"args":[{"name":"index","type":"GLuint"},{"name":"pname","type":"GLenum"}]}],"getVertexAttribOffset":[{"args":[{"name":"index","type":"GLuint"},{"name":"pname","type":"GLenum"}]}],"hint":[{"args":[{"name":"target","type":"GLenum"},{"name":"mode","type":"GLenum"}]}],"isBuffer":[{"args":[{"name":"buffer","type":"WebGLBuffer"}]}],"isEnabled":[{"args":[{"name":"cap","type":"GLenum"}]}],"isFramebuffer":[{"args":[{"name":"framebuffer","type":"WebGLFramebuffer"}]}],"isProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"isRenderbuffer":[{"args":[{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"isShader":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"isTexture":[{"args":[{"name":"texture","type":"WebGLTexture"}]}],"lineWidth":[{"args":[{"name":"width","type":"GLfloat"}]}],"linkProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"pixelStorei":[{"args":[{"name":"pname","type":"GLenum"},{"name":"param","type":"GLint"}]}],"polygonOffset":[{"args":[{"name":"factor","type":"GLfloat"},{"name":"units","type":"GLfloat"}]}],"readPixels":[{"args":[{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ArrayBufferView"}]}],"renderbufferStorage":[{"args":[{"name":"target","type":"GLenum"},{"name":"internalformat","type":"GLenum"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}],"sampleCoverage":[{"args":[{"name":"value","type":"GLclampf"},{"name":"invert","type":"GLboolean"}]}],"scissor":[{"args":[{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}],"shaderSource":[{"args":[{"name":"shader","type":"WebGLShader"},{"name":"source","type":"DOMString"}]}],"stencilFunc":[{"args":[{"name":"func","type":"GLenum"},{"name":"ref","type":"GLint"},{"name":"mask","type":"GLuint"}]}],"stencilFuncSeparate":[{"args":[{"name":"face","type":"GLenum"},{"name":"func","type":"GLenum"},{"name":"ref","type":"GLint"},{"name":"mask","type":"GLuint"}]}],"stencilMask":[{"args":[{"name":"mask","type":"GLuint"}]}],"stencilMaskSeparate":[{"args":[{"name":"face","type":"GLenum"},{"name":"mask","type":"GLuint"}]}],"stencilOp":[{"args":[{"name":"fail","type":"GLenum"},{"name":"zfail","type":"GLenum"},{"name":"zpass","type":"GLenum"}]}],"stencilOpSeparate":[{"args":[{"name":"face","type":"GLenum"},{"name":"fail","type":"GLenum"},{"name":"zfail","type":"GLenum"},{"name":"zpass","type":"GLenum"}]}],"texImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"border","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ArrayBufferView"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ImageData"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"image","type":"HTMLImageElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"canvas","type":"HTMLCanvasElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"video","type":"HTMLVideoElement"}]}],"texParameterf":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"},{"name":"param","type":"GLfloat"}]}],"texParameteri":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"},{"name":"param","type":"GLint"}]}],"texSubImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ArrayBufferView"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ImageData"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"image","type":"HTMLImageElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"canvas","type":"HTMLCanvasElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"video","type":"HTMLVideoElement"}]}],"uniform1f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"}]}],"uniform1fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform1i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"}]}],"uniform1iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniform2f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"}]}],"uniform2fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform2i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"}]}],"uniform2iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniform3f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"}]}],"uniform3fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform3i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"z","type":"GLint"}]}],"uniform3iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniform4f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"},{"name":"w","type":"GLfloat"}]}],"uniform4fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform4i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"z","type":"GLint"},{"name":"w","type":"GLint"}]}],"uniform4iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniformMatrix2fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"transpose","type":"GLboolean"},{"name":"value","type":"FloatArray"}]}],"uniformMatrix3fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"transpose","type":"GLboolean"},{"name":"value","type":"FloatArray"}]}],"uniformMatrix4fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"transpose","type":"GLboolean"},{"name":"value","type":"FloatArray"}]}],"useProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"validateProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"vertexAttrib1f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"}]}],"vertexAttrib1fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttrib2f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"}]}],"vertexAttrib2fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttrib3f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"}]}],"vertexAttrib3fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttrib4f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"},{"name":"w","type":"GLfloat"}]}],"vertexAttrib4fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttribPointer":[{"args":[{"name":"indx","type":"GLuint"},{"name":"size","type":"GLint"},{"name":"type","type":"GLenum"},{"name":"normalized","type":"GLboolean"},{"name":"stride","type":"GLsizei"},{"name":"offset","type":"GLintptr"}]}],"viewport":[{"args":[{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}]}
		;
		
		
		
		var checkType = {
			//OpenGL Type                      JS Types 
			"ArrayBuffer"          : checkType("null", "ArrayBuffer", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "Array"), 
			"ArrayBufferView"      : checkType("null", "ArrayBuffer", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "Array"), 
			"DOMString"            : checkType("null", "string"), 
			"FloatArray"           : checkType("null", "Float32Array", "Array"), 
			"GLbitfield"           : checkType("number"), 
			"GLboolean"            : checkType("boolean"),  
			"GLclampf"             : checkType("number"), 
			"GLenum"               : checkType("number"), 
			"GLfloat"              : checkType("number"), 
			"GLint"                : checkType("number"), 
			"GLintptr"             : checkType("number"), 
			"GLsizei"              : checkType("number"), 
			"GLsizeiptr"           : checkType("number"), 
			"GLuint"               : checkType("number"),
			"HTMLCanvasElement"    : checkType("null", "HTMLCanvasElement"),
			"HTMLImageElement"     : checkType("null", "HTMLImageElement"), 
			"HTMLVideoElement"     : checkType("null", "HTMLVideoElement"), 
			"ImageData"            : checkType("null", "ImageData"), 
			"Int32Array"           : checkType("null", "Int32Array", "Array"), 
			"WebGLBuffer"          : checkType("null", "WebGLBuffer"), 
			"WebGLFrameBuffer"     : checkType("null", "WebGLFrameBuffer"), 
			"WebGLProgram"         : checkType("null", "WebGLProgram"), 
			"WebGLRenderbuffer"    : checkType("null", "WebGLRenderbuffer"), 
			"WebGLShader"          : checkType("null", "WebGLShader"), 
			"WebGLTexture"         : checkType("null", "WebGLTexture"), 
			"WebGLUniformLocation" : checkType("null", "WebGLUniformLocation"), 
			"float"                : checkType("number"), 
			"long"                 : checkType("number") 
		};
		
		var checkValue = {
			//OpenGL Type            Way to check the correct value 
			"ArrayBuffer"          : checkFloatArray,
			"ArrayBufferView"      : checkFloatArray,
			"DOMString"            : ok, 
			"FloatArray"           : checkFloatArray, 
			"GLbitfield"           : isInt, 
			"GLboolean"            : isBool, 
			"GLclampf"             : isClampf, 
			"GLenum"               : isInt, 
			"GLfloat"              : ok, 
			"GLint"                : isInt, 
			"GLintptr"             : isInt, 
			"GLsizei"              : isInt, 
			"GLsizeiptr"           : isInt, 
			"GLuint"               : isInt, 
			"HTMLCanvasElement"    : ok, 
			"HTMLImageElement"     : ok, 
			"HTMLVideoElement"     : ok, 
			"ImageData"            : ok, 
			"Int32Array"           : checkIntArray, 
			"WebGLBuffer"          : ok, 
			"WebGLFrameBuffer"     : ok, 
			"WebGLProgram"         : ok, 
			"WebGLRenderbuffer"    : ok, 
			"WebGLShader"          : ok, 
			"WebGLTexture"         : ok, 
			"WebGLUniformLocation" : ok, 
			"float"                : ok, 
			"long"                 : isInt
		};
		
		function safeContext (gl, opt) { 
			var key, value, i, pair, safegl, map, keys, error; 	
		
			if(typeof opt === "string") {
				if(opt === "error") {
					error = throwError; 
				}
				else if(opt === "warn") {
					error = showWarning; 
				}
				else {
					throw new Error("can't process the option '" + opt + "!"); 
				}
			} 
			else if(typeof opt === "function") {
				error = opt; 
			}
			else {
				error = showWarning; 
			}
		
			keys = []; 
		
			for	(key in gl) {
				if(key === "getSafeContext") {
					continue; //ignore myself
				}
				keys.push(key); 
			}
		
			map = keys.map(function(key) {
				var val, type; 
				val = gl[key]; 
				type = typeof val; 
		
				if(type === "function") {
					return [key, createSafeCaller(gl, val, key, error)]; 
				}
			
				return [key]; 
			});
		
			safegl = { "isSafeContext" : true }; 
		
			//Add static properties. 
			for(i = 0; i != map.length; i++) {
				pair = map[i]; 
				key = pair[0]; 
				value = pair[1]; 
			
				if(value) {
					//override behaviour with my own function 
					safegl[key] = value; 
				} else {
					(function(key) { 
						//same behaviour as the original gl context. 
						Object.defineProperty(safegl, key, {
							get : function() { return gl[key]; }, 
							set : function(v) { gl[key] = v; }, 
							enumerable : true 
						}); 
					}(key)); 
				}
			}
		
			return safegl; 
		}
		
		function createSafeCaller (gl, func, funcname, error) {
			var glMethods = METHODS[funcname]; 
			if( !glMethods ) {
				console.warn("couldn't find reference definition for method " + funcname + "."); 
				//default behaviour
				return function() {
					return func.apply(gl, arguments); 	
				};
			}
		
			return function() {
				var funcDef = getFunctionDef(argumentsToArray(arguments), glMethods); 
		
				if(!funcDef) {
					error("couldn't apply arguments (" 
						+ argumentsToArray(arguments).join(", ") 
						+ ") to any of the possible schemas:\n" 
						+ glMethods.map(function(m) { 
							return "(" + m.args.map(function(arg) { return arg.type; }).join(", ") + ")" 
						  }).join("\n,") 
					); 
				}
				else {
					testArgumentValues(argumentsToArray(arguments), funcDef, funcname, error);
					//call original function 
					return func.apply(gl, arguments); 
				}
				
				return func.apply(gl, arguments); 
			};
		}
		
		function argumentsToArray(args) {
			return Array.prototype.slice.call(args); 
		}
		
		function testArgumentValues(args, funcDef, funcname, error) {
			var arg, type, name, i; 
			//check Arguments 
			//check if type is correct
			for( i=0; i != args.length; i++) {
				arg = args[i]; 
				type = funcDef.args[i].type; 
				name = funcDef.args[i].name; 
		
				if(!checkValue[type](arg)) {
					error("Argument '" + name + "' in function '" + funcname + "' was expected to be of type '" + type + "' but instead was called with value: " + arg); 
					return; 
				}
			}
		}
		
		function getFunctionDef(args, glMethods) {
				return glMethods.filter(function(glMethod) {				
					if(glMethod.args.length !== args.length) { 
						return false; 
					} 
		
					var i = 0; 
					return glMethod.args.every(function(glarg) {
						var ret = checkType[glarg.type](args[i++]); 
						return ret; 
					});
				})[0]; //undefined for no matches 
		}
		
		function throwError(text) {
			throw new Error(text); 
		}
		
		function showWarning(text) {
			console.warn(text); 
		}
		
		// ~~~ Type checking methods ~~~  
		function checkType() {
			var possibleTypes = argumentsToArray(arguments).map(function(type) { return type.toLowerCase(); });
			return function(value) {
				var valueType = toType(value); 
				return possibleTypes.some(function(type) { return valueType === type; }); 
			}
		}
		
		function ok() {
			//Value allready passed the typecheck and so the value is also correct. 
			return true; 
		}
		
		function checkFloatArray(v) {
			var type = toType(v); 
		
			if(type === "array") {
				for(var i = 0; i != v.length; i++) {
					if(!isFloat(v[i])) {
						return false; 
					}
				}
			}
		
			return true; 
		}
		
		function checkIntArray(v) {
			var type = toType(v); 
		
			if(type === "array") {
				for(var i = 0; i != v.length; i++) {
					if(!isInt(v[i])) {
						return false; 
					}
				}
			}
		
			return true; 
		}
		
		function isString(v) {
			return v === null || typeof v === "string"; 
		}
		
		function isFloat(v) {
			return typeof v === "number"; 
		}
		
		function isInt(v) {
			return typeof v === "number" && v === ~~v; 
		}
		
		function isBool(v) {
			return v === true || v === false; 
		}
		
		function isClampf(v) {
			return isFloat(v) && v >= 0 && v <= 1; 
		}
		
		//Fixing typeof http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/ 
		function toType (obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z0-9]+)/)[1].toLowerCase();
		}
		

		return function(option) { return safeContext(this, option); }; 
	}()); 
}



//Copyright (c) 2009 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.

// Various functions for helping debug WebGL apps.

var WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
	throw msg; 
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {

  // Generic setters and getters

  'enable': { 0:true },
  'disable': { 0:true },
  'getParameter': { 0:true },

  // Rendering

  'drawArrays': { 0:true },
  'drawElements': { 0:true, 2:true },

  // Shaders

  'createShader': { 0:true },
  'getShaderParameter': { 1:true },
  'getProgramParameter': { 1:true },

  // Vertex attributes

  'getVertexAttrib': { 1:true },
  'vertexAttribPointer': { 2:true },

  // Textures

  'bindTexture': { 0:true },
  'activeTexture': { 0:true },
  'getTexParameter': { 0:true, 1:true },
  'texParameterf': { 0:true, 1:true },
  'texParameteri': { 0:true, 1:true, 2:true },
  'texImage2D': { 0:true, 2:true, 6:true, 7:true },
  'texSubImage2D': { 0:true, 6:true, 7:true },
  'copyTexImage2D': { 0:true, 2:true },
  'copyTexSubImage2D': { 0:true },
  'generateMipmap': { 0:true },

  // Buffer objects

  'bindBuffer': { 0:true },
  'bufferData': { 0:true, 2:true },
  'bufferSubData': { 0:true },
  'getBufferParameter': { 0:true, 1:true },

  // Renderbuffers and framebuffers

  'pixelStorei': { 0:true, 1:true },
  'readPixels': { 4:true, 5:true },
  'bindRenderbuffer': { 0:true },
  'bindFramebuffer': { 0:true },
  'checkFramebufferStatus': { 0:true },
  'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
  'framebufferTexture2D': { 0:true, 1:true, 2:true },
  'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
  'getRenderbufferParameter': { 0:true, 1:true },
  'renderbufferStorage': { 0:true, 1:true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': { 0:true },
  'depthFunc': { 0:true },
  'blendFunc': { 0:true, 1:true },
  'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
  'blendEquation': { 0:true },
  'blendEquationSeparate': { 0:true, 1:true },
  'stencilFunc': { 0:true },
  'stencilFuncSeparate': { 0:true, 1:true },
  'stencilMaskSeparate': { 0:true },
  'stencilOp': { 0:true, 1:true, 2:true },
  'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

  // Culling

  'cullFace': { 0:true },
  'frontFace': { 0:true },
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? name :
      ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}

function makePropertyWrapper(wrapper, original, propertyName) {
  //log("wrap prop: " + propertyName);
  wrapper.__defineGetter__(propertyName, function() {
    return original[propertyName];
  });
  // TODO(gmane): this needs to handle properties that take more than
  // one value?
  wrapper.__defineSetter__(propertyName, function(value) {
    //log("set: " + propertyName);
    original[propertyName] = value;
  });
}

// Makes a function that calls a function on another object.
function makeFunctionWrapper(original, functionName) {
  //log("wrap fn: " + functionName);
  var f = original[functionName];
  return function() {
    //log("call: " + functionName);
    var result = f.apply(original, arguments);
    return result;
  };
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
function makeDebugContext(ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
            "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       makePropertyWrapper(wrapper, ctx, propertyName);
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow.hasOwnProperty(err)) {
        if (glErrorShadow[err]) {
          glErrorShadow[err] = false;
          return err;
        }
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingCanvas(canvas) {
  var unwrappedContext_;
  var wrappedContext_;
  var onLost_ = [];
  var onRestored_ = [];
  var wrappedContext_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var numCallsToLoseContext_ = 0;
  var numCalls_ = 0;
  var canRestore_ = false;
  var restoreTimeout_ = 0;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  canvas.getContext = function(f) {
    return function() {
      var ctx = f.apply(canvas, arguments);
      // Did we get a context and is it a WebGL context?
      if (ctx instanceof WebGLRenderingContext) {
        if (ctx != unwrappedContext_) {
          if (unwrappedContext_) {
            throw "got different context"
          }
          unwrappedContext_ = ctx;
          wrappedContext_ = makeLostContextSimulatingContext(unwrappedContext_);
        }
        return wrappedContext_;
      }
      return ctx;
    }
  }(canvas.getContext);

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  var addOnContextLostListener = function(listener) {
    onLost_.push(wrapEvent(listener));
  };

  var addOnContextRestoredListener = function(listener) {
    onRestored_.push(wrapEvent(listener));
  };


  function wrapAddEventListener(canvas) {
    var f = canvas.addEventListener;
    canvas.addEventListener = function(type, listener, bubble) {
      switch (type) {
        case 'webglcontextlost':
          addOnContextLostListener(listener);
          break;
        case 'webglcontextrestored':
          addOnContextRestoredListener(listener);
          break;
        default:
          f.apply(canvas, arguments);
      }
    };
  }

  wrapAddEventListener(canvas);

  canvas.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      numCallsToLoseContext_ = 0;
      ++contextId_;
      while (unwrappedContext_.getError());
      clearErrors();
      glErrorShadow_[unwrappedContext_.CONTEXT_LOST_WEBGL] = true;
      var event = makeWebGLContextEvent("context lost");
      var callbacks = onLost_.slice();
      setTimeout(function() {
          //log("numCallbacks:" + callbacks.length);
          for (var ii = 0; ii < callbacks.length; ++ii) {
            //log("calling callback:" + ii);
            callbacks[ii](event);
          }
          if (restoreTimeout_ >= 0) {
            setTimeout(function() {
                canvas.restoreContext();
              }, restoreTimeout_);
          }
        }, 0);
    }
  };

  canvas.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_.length) {
        setTimeout(function() {
            if (!canRestore_) {
              throw "can not restore. webglcontestlost listener did not call event.preventDefault";
            }
            freeResources();
            resetToInitialState(unwrappedContext_);
            contextLost_ = false;
            numCalls_ = 0;
            canRestore_ = false;
            var callbacks = onRestored_.slice();
            var event = makeWebGLContextEvent("context restored");
            for (var ii = 0; ii < callbacks.length; ++ii) {
              callbacks[ii](event);
            }
          }, 0);
      }
    }
  };

  canvas.loseContextInNCalls = function(numCalls) {
    if (contextLost_) {
      throw "You can not ask a lost contet to be lost";
    }
    numCallsToLoseContext_ = numCalls_ + numCalls;
  };

  canvas.getNumCalls = function() {
    return numCalls_;
  };

  canvas.setRestoreTimeout = function(timeout) {
    restoreTimeout_ = timeout;
  };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShadow_[k];
    }
  }

  function loseContextIfTime() {
    ++numCalls_;
    if (!contextLost_) {
      if (numCallsToLoseContext_ == numCalls_) {
        canvas.loseContext();
      }
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextFunctionWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // log("calling:" + functionName);
      // Only call the functions if the context is not lost.
      loseContextIfTime();
      if (!contextLost_) {
        //if (!checkResources(arguments)) {
        //  glErrorShadow_[wrappedContext_.INVALID_OPERATION] = true;
        //  return;
        //}
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        unwrappedContext_.deleteBuffer(resource);
      } else if (resource instanceof WebGLFramebuffer) {
        unwrappedContext_.deleteFramebuffer(resource);
      } else if (resource instanceof WebGLProgram) {
        unwrappedContext_.deleteProgram(resource);
      } else if (resource instanceof WebGLRenderbuffer) {
        unwrappedContext_.deleteRenderbuffer(resource);
      } else if (resource instanceof WebGLShader) {
        unwrappedContext_.deleteShader(resource);
      } else if (resource instanceof WebGLTexture) {
        unwrappedContext_.deleteTexture(resource);
      }
    }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {
      statusMessage: statusMessage,
      preventDefault: function() {
          canRestore_ = true;
        }
    };
  }

  return canvas;

  function makeLostContextSimulatingContext(ctx) {
    // copy all functions and properties to wrapper
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'function') {
         wrappedContext_[propertyName] = makeLostContextFunctionWrapper(
             ctx, propertyName);
       } else {
         makePropertyWrapper(wrappedContext_, ctx, propertyName);
       }
    }

    // Wrap a few functions specially.
    wrappedContext_.getError = function() {
      loseContextIfTime();
      if (!contextLost_) {
        var err;
        while (err = unwrappedContext_.getError()) {
          glErrorShadow_[err] = true;
        }
      }
      for (var err in glErrorShadow_) {
        if (glErrorShadow_[err]) {
          delete glErrorShadow_[err];
          return err;
        }
      }
      return wrappedContext_.NO_ERROR;
    };

    var creationFunctions = [
      "createBuffer",
      "createFramebuffer",
      "createProgram",
      "createRenderbuffer",
      "createShader",
      "createTexture"
    ];
    for (var ii = 0; ii < creationFunctions.length; ++ii) {
      var functionName = creationFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          var obj = f.apply(ctx, arguments);
          obj.__webglDebugContextLostId__ = contextId_;
          resourceDb_.push(obj);
          return obj;
        };
      }(ctx[functionName]);
    }

    var functionsThatShouldReturnNull = [
      "getActiveAttrib",
      "getActiveUniform",
      "getBufferParameter",
      "getContextAttributes",
      "getAttachedShaders",
      "getFramebufferAttachmentParameter",
      "getParameter",
      "getProgramParameter",
      "getProgramInfoLog",
      "getRenderbufferParameter",
      "getShaderParameter",
      "getShaderInfoLog",
      "getShaderSource",
      "getTexParameter",
      "getUniform",
      "getUniformLocation",
      "getVertexAttrib"
    ];
    for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
      var functionName = functionsThatShouldReturnNull[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    var isFunctions = [
      "isBuffer",
      "isEnabled",
      "isFramebuffer",
      "isProgram",
      "isRenderbuffer",
      "isShader",
      "isTexture"
    ];
    for (var ii = 0; ii < isFunctions.length; ++ii) {
      var functionName = isFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return false;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    wrappedContext_.checkFramebufferStatus = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return wrappedContext_.FRAMEBUFFER_UNSUPPORTED;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.checkFramebufferStatus);

    wrappedContext_.getAttribLocation = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return -1;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getAttribLocation);

    wrappedContext_.getVertexAttribOffset = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return 0;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getVertexAttribOffset);

    wrappedContext_.isContextLost = function() {
      return contextLost_;
    };

    return wrappedContext_;
  }
}

return {
    /**
     * Initializes this module. Safe to call more than once.
     * @param {!WebGLRenderingContext} ctx A WebGL context. If
    }
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) +
   *            " was caused by call to " + funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a canvas element returns a wrapped canvas element that will
   * simulate lost context. The canvas returned adds the following functions.
   *
   * loseContext:
   *   simulates a lost context event.
   *
   * restoreContext:
   *   simulates the context being restored.
   *
   * lostContextInNCalls:
   *   loses the context after N gl calls.
   *
   * getNumCalls:
   *   tells you how many gl calls there have been so far.
   *
   * setRestoreTimeout:
   *   sets the number of milliseconds until the context is restored
   *   after it has been lost. Defaults to 0. Pass -1 to prevent
   *   automatic restoring.
   *
   * @param {!Canvas} canvas The canvas element to wrap.
   */
  'makeLostContextSimulatingCanvas': makeLostContextSimulatingCanvas,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();



var keyfuncs = (function() {
	var keysDown = new Uint8Array(256); 
	var keysDownOld = new Uint8Array(256); 

	cleanKeys(); 

	document.addEventListener("keydown", function(e) {
		var k = e.keyCode; 
		if(k < 256) {
			keysDown[k] = 1; 
		}
	}); 

	document.addEventListener("keyup", function(e) {
		var k = e.keyCode; 
		if(k < 256) {
			keysDown[k] = 0; 
		}
	}); 

	window.addEventListener("blur", function() { 
		cleanKeys(); 	
	});

	function cleanKeys() {
		for(var i = 0; i !== 256; i++) {
			keysDownOld[i] = 0; 
			keysDown[i] = 0; 
		}
	}

	function setOldKeyState() {
		for(var i = 0; i !== 256; i++) {
			keysDownOld[i] = keysDown[i]; 
		}
	}

	var keys = {
		"backspace":8, "tab":9, "enter":13, "shift":16, "ctrl":17, "alt":18, "pause":19, "capslock":20,
		"escape":27, "space":32, "pageUp":33, "pageDown":34, "end":35, "home":36,
		"left":37, "up":38, "right":39, "down":40, 
		"insert":45, "delete":46,
		"num0":48, "num1":49, "num2":50, "num3":51, "num4":52, "num5":53, "num6":54, "num7":55, "num8":56, "num9":57,
		"a":65, "b":66, "c":67, "d":68, "e":69, "f":70, "g":71, "h":72, "i":73, "j":74, "k":75, "l":76, "m":77, 
		"n":78, "o":79, "p":80, "q":81, "r":82, "s":83, "t":84, "u":85, "v":86, "w":87, "x":88, "y":89, "z":90, 
		"windowKeyLeft":91, "windowKeyRight":92, "select":93,
		"numpad0":96, "numpad1":97, "numpad2":98, "numpad3":99, "numpad4":100, 
		"numpad5":101, "numpad6":102, "numpad7":103, "numpad8":104, "numpad9":105,
		"multiply":106, "add":107, "subtract":109, "decimalPoint":110, "divide":111,
		"f1":112, "f2":113, "f3":114, "f4":115, "f5":116, "f6":117,
		"f7":118, "f8":119, "f9":120, "f10":121, "f11":122, "f12":123,
		"numlock":144, "scrolllock":145, "semicolon":186, "equals":187, "comma":188,
		"dash":189, "period":190, "slash":191, "graveAccent":192, "openBracket":219,
		"backSlash":220, "closeBraket":221, "quote":222
	};

	return {
		"keyIsDown" : function (key) {
			return keysDown[key] !== 0; 
		}, 
		"keyIsUp" :  function (key) {
			return keysDown[key] === 0; 
		}, 
		"keyWasPressed" : function (key) {
			return keysDown[key] !== 0 && keysDownOld[key] === 0;
		},  
		"keyWasReleased" : function (key) {
			return keysDown[key] === 0 && keysDownOld[key] !== 0;
		}, 
		"keys" : keys, 
		"setOldKeyState" : setOldKeyState, 
		"keysDown" : keysDown, 
		"keysDownOld" : keysDownOld 
	};
}());




var joyfuncs = (function () {
	var gamepads = navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || [];
	var e = 0.2; 
	var edge0 = e; 
	var edge1 = 1 - e; 

	var NONE = {
		"axes" : new Float32Array(6), 
		"buttons" : new Float32Array(24), 
		"id" : "NONE", 
		"index" : -1 
	}; 

	var pad = NONE; 

	function update() {
		pad = updateFirstPad(); 		
	}

	function updateFirstPad() {
		for (var i = 0; i < gamepads.length; ++i) {
			var pad = gamepads[i];
			if(pad) {
				var axes = new Float32Array(pad.axes.length); 
				for(var a = 0; a < pad.axes.length; a++) { 
					if(pad.axes[a]) { 
						axes[a] = normalise(pad.axes[a]);
					}
				}

				return {
					"axes" : axes, 
					"buttons" : pad.buttons, 
					"id" : pad.id, 
					"index" : pad.index 
				};
			}
		}

		return NONE;  
	}

	function getFirstPad() {
		return pad; 
	}

	function normalise(x) {
		if(x < 0) {
			return -normalise(-x); 
		}

		// like GLSL smoothstep(x, 0, 1); 
		var t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0))); 
		return t * t * (3.0 - 2.0 * t);
	}

	return {
		"update" : update, 
		"getFirstPad" : getFirstPad  
	};
}());  



var objparse = (function() { 
	function parse(data) {
		var lines = data.split("\n"); 
	
		var vertices = []; 
		var texcoords = []; 
		var normals = []; 
		var indices = []; 

		var line; 
		var operations = {
			"v"  : v,
			"vn" : vn,
			"vt" : vt, 
			"f"  : f	
		};
	
		for(var i = 0; i < lines.length; i++) {
			line = lines[i].trim(); 
			var elements = line.split(/[\t\r\n ]+/g);
			var head = elements.shift(); 
		
			var opp = operations[head]; 
	
			if(opp) opp(elements); 
		}
	
		var ret = { vertices : new Float32Array(vertices) };
	
		if(texcoords.length !== 0) {
		if(texcoords.length * 2 !== vertices.length) {
				throw "Texture coordinates don't match vertices."; 
			}
			ret.textureCoordinates = new Float32Array(texcoords);
		}
	
		if(normals.length !== 0) {
			if(normals.length !== vertices.length) {
				throw "Normals don't match vertices."; 
			}
			ret.normals = new Float32Array(normals); 
		}
	
		if(indices.length !== 0) {
			ret.indices = new Uint16Array(indices); 
		}
	
		return ret; 
	
		function f(vertices) {
			if(vertices.length < 3) {
				throw "Strange amount of vertices in face."; 
			}

			if(vertices.length > 3) {
				//let's asume it's convex 
				for(var n = vertices.length - 1; n !== 1; n--) {
					f([vertices[0], vertices[n-1], vertices[n]]); 
				}
				return; 
			}
	
			var fa,fb,fc;
			fa = vertices[0].split(/\//g);
			fb = vertices[1].split(/\//g);
			fc = vertices[2].split(/\//g);
					
			var fav,fat,fan, fbv,fbt,fbn, fcv,fct,fcn; 
			fav = fa[0]; 
			fbv = fb[0]; 
			fcv = fc[0]; 
	
			fat = fa[1] || fav; 
			fbt = fb[1] || fbv; 
			fct = fc[1] || fcv; 
	
			fan = fa[2] || fav; 
			fbn = fb[2] || fbv; 
			fcn = fc[2] || fcv;
	
			if(!fav || !fbv || !fcv) {
				throw "wrong Face format"; 
			}
	
			if(fav !== fat || fav !== fan || 
			   fbv !== fbt || fbv !== fbn || 
			   fcv !== fct || fcv !== fcn) {
				throw "Texture and Normal Index must correspont with vertex."; 
			} 
				
			indices.push(Number(fav) -1); 
			indices.push(Number(fbv) -1); 
			indices.push(Number(fcv) -1); 
		}
	
		function v(numbers) {
			if(numbers.length !== 3) { 
				throw "vertice needs to be three elements big."; 
			}
	
			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
				
			vertices.push(a,b,c,1); 
		}

		function vn(numbers) {
			if(numbers.length !== 3) { 
				throw "normals needs to be three elements big."; 
			}
	
			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
				
			normals.push(a,b,c,0); 
		}

		function vt(uv) {
			if(uv.length !== 2) {
				throw "Texture coordinate needs two parameter."; 
			}

			var u,v; 
			u = Number(uv[0]);
			v = Number(uv[1]);
	
			texcoords.push(u,v); 
		}
	}	

	return {
		"parse" : parse 
	};
}()); 


// var zepto = (function() { 
// 
// 	var wZepto = window.Zepto; 
// 	var w$ = window.$; 
// 
// 	//     Zepto.js
// 	//     (c) 2010-2012 Thomas Fuchs
// 	//     Zepto.js may be freely distributed under the MIT license.
// 	
// 	var Zepto = (function() {
// 	  var undefined, key, $$, classList, emptyArray = [], slice = emptyArray.slice,
// 	    document = window.document,
// 	    elementDisplay = {}, classCache = {},
// 	    getComputedStyle = document.defaultView.getComputedStyle,
// 	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
// 	    fragmentRE = /^\s*<(\w+)[^>]*>/,
// 	    elementTypes = [1, 9, 11],
// 	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
// 	    table = document.createElement('table'),
// 	    tableRow = document.createElement('tr'),
// 	    containers = {
// 	      'tr': document.createElement('tbody'),
// 	      'tbody': table, 'thead': table, 'tfoot': table,
// 	      'td': tableRow, 'th': tableRow,
// 	      '*': document.createElement('div')
// 	    },
// 	    readyRE = /complete|loaded|interactive/,
// 	    classSelectorRE = /^\.([\w-]+)$/,
// 	    idSelectorRE = /^#([\w-]+)$/,
// 	    tagSelectorRE = /^[\w-]+$/;
// 	
// 	  function isF(value) { return ({}).toString.call(value) == "[object Function]" }
// 	  function isO(value) { return value instanceof Object }
// 	  function isA(value) { return value instanceof Array }
// 	  function likeArray(obj) { return typeof obj.length == 'number' }
// 	
// 	  function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null }) }
// 	  function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array }
// 	  function camelize(str)  { return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
// 	  function dasherize(str){
// 	    return str.replace(/::/g, '/')
// 	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
// 	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
// 	           .replace(/_/g, '-')
// 	           .toLowerCase();
// 	  }
// 	  function uniq(array)    { return array.filter(function(item,index,array){ return array.indexOf(item) == index }) }
// 	
// 	  function classRE(name){
// 	    return name in classCache ?
// 	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'));
// 	  }
// 	
// 	  function maybeAddPx(name, value) { return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value; }
// 	
// 	  function defaultDisplay(nodeName) {
// 	    var element, display;
// 	    if (!elementDisplay[nodeName]) {
// 	      element = document.createElement(nodeName);
// 	      document.body.appendChild(element);
// 	      display = getComputedStyle(element, '').getPropertyValue("display");
// 	      element.parentNode.removeChild(element);
// 	      display == "none" && (display = "block");
// 	      elementDisplay[nodeName] = display;
// 	    }
// 	    return elementDisplay[nodeName];
// 	  }
// 	
// 	  function fragment(html, name) {
// 	    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
// 	    if (!(name in containers)) name = '*';
// 	    var container = containers[name];
// 	    container.innerHTML = '' + html;
// 	    return slice.call(container.childNodes);
// 	  }
// 	
// 	  function Z(dom, selector){
// 	    dom = dom || emptyArray;
// 	    dom.__proto__ = Z.prototype;
// 	    dom.selector = selector || '';
// 	    return dom;
// 	  }
// 	
// 	  function $(selector, context){
// 	    if (!selector) return Z();
// 	    if (context !== undefined) return $(context).find(selector);
// 	    else if (isF(selector)) return $(document).ready(selector);
// 	    else if (selector instanceof Z) return selector;
// 	    else {
// 	      var dom;
// 	      if (isA(selector)) dom = compact(selector);
// 	      else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
// 	        dom = [selector], selector = null;
// 	      else if (fragmentRE.test(selector))
// 	        dom = fragment(selector.trim(), RegExp.$1), selector = null;
// 	      else if (selector.nodeType && selector.nodeType == 3) dom = [selector];
// 	      else dom = $$(document, selector);
// 	      return Z(dom, selector);
// 	    }
// 	  }
// 	
// 	  $.extend = function(target){
// 	    slice.call(arguments, 1).forEach(function(source) {
// 	      for (key in source) target[key] = source[key];
// 	    })
// 	    return target;
// 	  }
// 	
// 	  $.qsa = $$ = function(element, selector){
// 	    var found;
// 	    return (element === document && idSelectorRE.test(selector)) ?
// 	      ( (found = element.getElementById(RegExp.$1)) ? [found] : emptyArray ) :
// 	      (element.nodeType !== 1 && element.nodeType !== 9) ? emptyArray :
// 	      slice.call(
// 	        classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
// 	        tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
// 	        element.querySelectorAll(selector)
// 	      );
// 	  }
// 	
// 	  function filtered(nodes, selector){
// 	    return selector === undefined ? $(nodes) : $(nodes).filter(selector);
// 	  }
// 	
// 	  function funcArg(context, arg, idx, payload){
// 	   return isF(arg) ? arg.call(context, idx, payload) : arg;
// 	  }
// 	
// 	  $.isFunction = isF;
// 	  $.isObject = isO;
// 	  $.isArray = isA;
// 	
// 	  $.inArray = function(elem, array, i) {
// 			return emptyArray.indexOf.call(array, elem, i);
// 		}
// 	
// 	  $.map = function(elements, callback) {
// 	    var value, values = [], i, key;
// 	    if (likeArray(elements))
// 	      for (i = 0; i < elements.length; i++) {
// 	        value = callback(elements[i], i);
// 	        if (value != null) values.push(value);
// 	      }
// 	    else
// 	      for (key in elements) {
// 	        value = callback(elements[key], key);
// 	        if (value != null) values.push(value);
// 	      }
// 	    return flatten(values);
// 	  }
// 	
// 	  $.each = function(elements, callback) {
// 	    var i, key;
// 	    if (likeArray(elements))
// 	      for(i = 0; i < elements.length; i++) {
// 	        if(callback.call(elements[i], i, elements[i]) === false) return elements;
// 	      }
// 	    else
// 	      for(key in elements) {
// 	        if(callback.call(elements[key], key, elements[key]) === false) return elements;
// 	      }
// 	    return elements;
// 	  }
// 	
// 	  $.fn = {
// 	    forEach: emptyArray.forEach,
// 	    reduce: emptyArray.reduce,
// 	    push: emptyArray.push,
// 	    indexOf: emptyArray.indexOf,
// 	    concat: emptyArray.concat,
// 	    map: function(fn){
// 	      return $.map(this, function(el, i){ return fn.call(el, i, el) });
// 	    },
// 	    slice: function(){
// 	      return $(slice.apply(this, arguments));
// 	    },
// 	    ready: function(callback){
// 	      if (readyRE.test(document.readyState)) callback($);
// 	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false);
// 	      return this;
// 	    },
// 	    get: function(idx){ return idx === undefined ? slice.call(this) : this[idx] },
// 	    size: function(){ return this.length },
// 	    remove: function () {
// 	      return this.each(function () {
// 	        if (this.parentNode != null) {
// 	          this.parentNode.removeChild(this);
// 	        }
// 	      });
// 	    },
// 	    each: function(callback){
// 	      this.forEach(function(el, idx){ callback.call(el, idx, el) });
// 	      return this;
// 	    },
// 	    filter: function(selector){
// 	      return $([].filter.call(this, function(element){
// 	        return element.parentNode && $$(element.parentNode, selector).indexOf(element) >= 0;
// 	      }));
// 	    },
// 	    end: function(){
// 	      return this.prevObject || $();
// 	    },
// 	    andSelf:function(){
// 	      return this.add(this.prevObject || $())
// 	    },
// 	    add:function(selector,context){
// 	      return $(uniq(this.concat($(selector,context))));
// 	    },
// 	    is: function(selector){
// 	      return this.length > 0 && $(this[0]).filter(selector).length > 0;
// 	    },
// 	    not: function(selector){
// 	      var nodes=[];
// 	      if (isF(selector) && selector.call !== undefined)
// 	        this.each(function(idx){
// 	          if (!selector.call(this,idx)) nodes.push(this);
// 	        });
// 	      else {
// 	        var excludes = typeof selector == 'string' ? this.filter(selector) :
// 	          (likeArray(selector) && isF(selector.item)) ? slice.call(selector) : $(selector);
// 	        this.forEach(function(el){
// 	          if (excludes.indexOf(el) < 0) nodes.push(el);
// 	        });
// 	      }
// 	      return $(nodes);
// 	    },
// 	    eq: function(idx){
// 	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1);
// 	    },
// 	    first: function(){ var el = this[0]; return el && !isO(el) ? el : $(el) },
// 	    last: function(){ var el = this[this.length - 1]; return el && !isO(el) ? el : $(el) },
// 	    find: function(selector){
// 	      var result;
// 	      if (this.length == 1) result = $$(this[0], selector);
// 	      else result = this.map(function(){ return $$(this, selector) });
// 	      return $(result);
// 	    },
// 	    closest: function(selector, context){
// 	      var node = this[0], candidates = $$(context || document, selector);
// 	      if (!candidates.length) node = null;
// 	      while (node && candidates.indexOf(node) < 0)
// 	        node = node !== context && node !== document && node.parentNode;
// 	      return $(node);
// 	    },
// 	    parents: function(selector){
// 	      var ancestors = [], nodes = this;
// 	      while (nodes.length > 0)
// 	        nodes = $.map(nodes, function(node){
// 	          if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
// 	            ancestors.push(node);
// 	            return node;
// 	          }
// 	        });
// 	      return filtered(ancestors, selector);
// 	    },
// 	    parent: function(selector){
// 	      return filtered(uniq(this.pluck('parentNode')), selector);
// 	    },
// 	    children: function(selector){
// 	      return filtered(this.map(function(){ return slice.call(this.children) }), selector);
// 	    },
// 	    siblings: function(selector){
// 	      return filtered(this.map(function(i, el){
// 	        return slice.call(el.parentNode.children).filter(function(child){ return child!==el });
// 	      }), selector);
// 	    },
// 	    empty: function(){ return this.each(function(){ this.innerHTML = '' }) },
// 	    pluck: function(property){ return this.map(function(){ return this[property] }) },
// 	    show: function(){
// 	      return this.each(function() {
// 	        this.style.display == "none" && (this.style.display = null);
// 	        if (getComputedStyle(this, '').getPropertyValue("display") == "none") {
// 	          this.style.display = defaultDisplay(this.nodeName)
// 	        }
// 	      })
// 	    },
// 	    replaceWith: function(newContent) {
// 	      return this.each(function() {
// 	        $(this).before(newContent).remove();
// 	      });
// 	    },
// 	    wrap: function(newContent) {
// 	      return this.each(function() {
// 	        $(this).wrapAll($(newContent)[0].cloneNode(false));
// 	      });
// 	    },
// 	    wrapAll: function(newContent) {
// 	      if (this[0]) {
// 	        $(this[0]).before(newContent = $(newContent));
// 	        newContent.append(this);
// 	      }
// 	      return this;
// 	    },
// 	    unwrap: function(){
// 	      this.parent().each(function(){
// 	        $(this).replaceWith($(this).children());
// 	      });
// 	      return this;
// 	    },
// 	    hide: function(){
// 	      return this.css("display", "none")
// 	    },
// 	    toggle: function(setting){
// 	      return (setting === undefined ? this.css("display") == "none" : setting) ? this.show() : this.hide();
// 	    },
// 	    prev: function(){ return $(this.pluck('previousElementSibling')) },
// 	    next: function(){ return $(this.pluck('nextElementSibling')) },
// 	    html: function(html){
// 	      return html === undefined ?
// 	        (this.length > 0 ? this[0].innerHTML : null) :
// 	        this.each(function (idx) {
// 	          var originHtml = this.innerHTML;
// 	          $(this).empty().append( funcArg(this, html, idx, originHtml) );
// 	        });
// 	    },
// 	    text: function(text){
// 	      return text === undefined ?
// 	        (this.length > 0 ? this[0].textContent : null) :
// 	        this.each(function(){ this.textContent = text });
// 	    },
// 	    attr: function(name, value){
// 	      var res;
// 	      return (typeof name == 'string' && value === undefined) ?
// 	        (this.length == 0 ? undefined :
// 	          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
// 	          (!(res = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : res
// 	        ) :
// 	        this.each(function(idx){
// 	          if (isO(name)) for (key in name) this.setAttribute(key, name[key])
// 	          else this.setAttribute(name, funcArg(this, value, idx, this.getAttribute(name)));
// 	        });
// 	    },
// 	    removeAttr: function(name) {
// 	      return this.each(function() { this.removeAttribute(name); });
// 	    },
// 	    data: function(name, value){
// 	      return this.attr('data-' + name, value);
// 	    },
// 	    val: function(value){
// 	      return (value === undefined) ?
// 	        (this.length > 0 ? this[0].value : null) :
// 	        this.each(function(idx){
// 	          this.value = funcArg(this, value, idx, this.value);
// 	        });
// 	    },
// 	    offset: function(){
// 	      if(this.length==0) return null;
// 	      var obj = this[0].getBoundingClientRect();
// 	      return {
// 	        left: obj.left + window.pageXOffset,
// 	        top: obj.top + window.pageYOffset,
// 	        width: obj.width,
// 	        height: obj.height
// 	      };
// 	    },
// 	    css: function(property, value){
// 	      if (value === undefined && typeof property == 'string') {
// 	        return(
// 	          this.length == 0
// 	            ? undefined
// 	            : this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property)
// 	        );
// 	      }
// 	      var css = '';
// 	      for (key in property) css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
// 	      if (typeof property == 'string') css = dasherize(property) + ":" + maybeAddPx(property, value);
// 	      return this.each(function() { this.style.cssText += ';' + css });
// 	    },
// 	    index: function(element){
// 	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
// 	    },
// 	    hasClass: function(name){
// 	      if (this.length < 1) return false;
// 	      else return classRE(name).test(this[0].className);
// 	    },
// 	    addClass: function(name){
// 	      return this.each(function(idx) {
// 	        classList = [];
// 	        var cls = this.className, newName = funcArg(this, name, idx, cls);
// 	        newName.split(/\s+/g).forEach(function(klass) {
// 	          if (!$(this).hasClass(klass)) {
// 	            classList.push(klass)
// 	          }
// 	        }, this);
// 	        classList.length && (this.className += (cls ? " " : "") + classList.join(" "))
// 	      });
// 	    },
// 	    removeClass: function(name){
// 	      return this.each(function(idx) {
// 	        if(name === undefined)
// 	          return this.className = '';
// 	        classList = this.className;
// 	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
// 	          classList = classList.replace(classRE(klass), " ")
// 	        });
// 	        this.className = classList.trim()
// 	      });
// 	    },
// 	    toggleClass: function(name, when){
// 	      return this.each(function(idx){
// 	        var newName = funcArg(this, name, idx, this.className);
// 	        (when === undefined ? !$(this).hasClass(newName) : when) ?
// 	          $(this).addClass(newName) : $(this).removeClass(newName);
// 	      });
// 	    }
// 	  };
// 	
// 	  'filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings'.split(',').forEach(function(property){
// 	    var fn = $.fn[property];
// 	    $.fn[property] = function() {
// 	      var ret = fn.apply(this, arguments);
// 	      ret.prevObject = this;
// 	      return ret;
// 	    }
// 	  });
// 	
// 	  ['width', 'height'].forEach(function(dimension){
// 	    $.fn[dimension] = function(value) {
// 	      var offset, Dimension = dimension.replace(/./, function(m) { return m[0].toUpperCase() });
// 	      if (value === undefined) return this[0] == window ? window['inner' + Dimension] :
// 	        this[0] == document ? document.documentElement['offset' + Dimension] :
// 	        (offset = this.offset()) && offset[dimension];
// 	      else return this.each(function(idx){
// 	        var el = $(this);
// 	        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
// 	      });
// 	    }
// 	  });
// 	
// 	  function insert(operator, target, node) {
// 	    var parent = (operator % 2) ? target : target.parentNode;
// 	    parent && parent.insertBefore(node,
// 	      !operator ? target.nextSibling :      // after
// 	      operator == 1 ? parent.firstChild :   // prepend
// 	      operator == 2 ? target :              // before
// 	      null);                                // append
// 	  }
// 	
// 	  function traverseNode (node, fun) {
// 	    fun(node);
// 	    for (var key in node.childNodes) {
// 	      traverseNode(node.childNodes[key], fun);
// 	    }
// 	  }
// 	
// 	  adjacencyOperators.forEach(function(key, operator) {
// 	    $.fn[key] = function(html){
// 	      var nodes = isO(html) ? html : fragment(html);
// 	      if (!('length' in nodes) || nodes.nodeType) nodes = [nodes];
// 	      if (nodes.length < 1) return this;
// 	      var size = this.length, copyByClone = size > 1, inReverse = operator < 2;
// 	
// 	      return this.each(function(index, target){
// 	        for (var i = 0; i < nodes.length; i++) {
// 	          var node = nodes[inReverse ? nodes.length-i-1 : i];
// 	          traverseNode(node, function (node) {
// 	            if (node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' && (!node.type || node.type === 'text/javascript')) {
// 	              window['eval'].call(window, node.innerHTML);
// 	            }
// 	          });
// 	          if (copyByClone && index < size - 1) node = node.cloneNode(true);
// 	          insert(operator, target, node);
// 	        }
// 	      });
// 	    };
// 	
// 	    var reverseKey = (operator % 2) ? key+'To' : 'insert'+(operator ? 'Before' : 'After');
// 	    $.fn[reverseKey] = function(html) {
// 	      $(html)[key](this);
// 	      return this;
// 	    };
// 	  });
// 	
// 	  Z.prototype = $.fn;
// 	
// 	  return $;
// 	})();
// 	
// 	window.Zepto = Zepto;
// 	'$' in window || (window.$ = Zepto);
// 	
// 
// 	//     Zepto.js
// 	//     (c) 2010-2012 Thomas Fuchs
// 	//     Zepto.js may be freely distributed under the MIT license.
// 	
// 	(function($){
// 	  var jsonpID = 0,
// 	      isObject = $.isObject,
// 	      document = window.document,
// 	      key,
// 	      name,
// 	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
// 	
// 	  // trigger a custom event and return false if it was cancelled
// 	  function triggerAndReturn(context, eventName, data) {
// 	    var event = $.Event(eventName);
// 	    $(context).trigger(event, data);
// 	    return !event.defaultPrevented;
// 	  }
// 	
// 	  // trigger an Ajax "global" event
// 	  function triggerGlobal(settings, context, eventName, data) {
// 	    if (settings.global) return triggerAndReturn(context || document, eventName, data);
// 	  }
// 	
// 	  // Number of active Ajax requests
// 	  $.active = 0;
// 	
// 	  function ajaxStart(settings) {
// 	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
// 	  }
// 	  function ajaxStop(settings) {
// 	    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop');
// 	  }
// 	
// 	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
// 	  function ajaxBeforeSend(xhr, settings) {
// 	    var context = settings.context;
// 	    if (settings.beforeSend.call(context, xhr, settings) === false ||
// 	        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
// 	      return false;
// 	
// 	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
// 	  }
// 	  function ajaxSuccess(data, xhr, settings) {
// 	    var context = settings.context, status = 'success';
// 	    settings.success.call(context, data, status, xhr);
// 	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
// 	    ajaxComplete(status, xhr, settings);
// 	  }
// 	  // type: "timeout", "error", "abort", "parsererror"
// 	  function ajaxError(error, type, xhr, settings) {
// 	    var context = settings.context;
// 	    settings.error.call(context, xhr, type, error);
// 	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error]);
// 	    ajaxComplete(type, xhr, settings);
// 	  }
// 	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
// 	  function ajaxComplete(status, xhr, settings) {
// 	    var context = settings.context;
// 	    settings.complete.call(context, xhr, status);
// 	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
// 	    ajaxStop(settings);
// 	  }
// 	
// 	  // Empty function, used as default callback
// 	  function empty() {}
// 	
// 	  // ### $.ajaxJSONP
// 	  //
// 	  // Load JSON from a server in a different domain (JSONP)
// 	  //
// 	  // *Arguments:*
// 	  //
// 	  //     options — object that configure the request,
// 	  //               see avaliable options below
// 	  //
// 	  // *Avaliable options:*
// 	  //
// 	  //     url     — url to which the request is sent
// 	  //     success — callback that is executed if the request succeeds
// 	  //     error   — callback that is executed if the server drops error
// 	  //     context — in which context to execute the callbacks in
// 	  //
// 	  // *Example:*
// 	  //
// 	  //     $.ajaxJSONP({
// 	  //        url:     'http://example.com/projects?callback=?',
// 	  //        success: function (data) {
// 	  //            projects.push(json);
// 	  //        }
// 	  //     });
// 	  //
// 	  $.ajaxJSONP = function(options){
// 	    var callbackName = 'jsonp' + (++jsonpID),
// 	      script = document.createElement('script'),
// 	      abort = function(){
// 	        $(script).remove();
// 	        if (callbackName in window) window[callbackName] = empty;
// 	        ajaxComplete('abort', xhr, options);
// 	      },
// 	      xhr = { abort: abort }, abortTimeout;
// 	
// 	    if (options.error) script.onerror = function() {
// 	      xhr.abort();
// 	      options.error();
// 	    };
// 	
// 	    window[callbackName] = function(data){
// 	      clearTimeout(abortTimeout);
// 	      $(script).remove();
// 	      delete window[callbackName];
// 	      ajaxSuccess(data, xhr, options);
// 	    };
// 	
// 	    script.src = options.url.replace(/=\?/, '=' + callbackName);
// 	    $('head').append(script);
// 	
// 	    if (options.timeout > 0) abortTimeout = setTimeout(function(){
// 	        xhr.abort();
// 	        ajaxComplete('timeout', xhr, options);
// 	      }, options.timeout);
// 	
// 	    return xhr;
// 	  };
// 	
// 	  // ### $.ajaxSettings
// 	  //
// 	  // AJAX settings
// 	  //
// 	  $.ajaxSettings = {
// 	    // Default type of request
// 	    type: 'GET',
// 	    // Callback that is executed before request
// 	    beforeSend: empty,
// 	    // Callback that is executed if the request succeeds
// 	    success: empty,
// 	    // Callback that is executed the the server drops error
// 	    error: empty,
// 	    // Callback that is executed on request complete (both: error and success)
// 	    complete: empty,
// 	    // The context for the callbacks
// 	    context: null,
// 	    // Whether to trigger "global" Ajax events
// 	    global: true,
// 	    // Transport
// 	    xhr: function () {
// 	      return new window.XMLHttpRequest();
// 	    },
// 	    // MIME types mapping
// 	    accepts: {
// 	      script: 'text/javascript, application/javascript',
// 	      json:   'application/json',
// 	      xml:    'application/xml, text/xml',
// 	      html:   'text/html',
// 	      text:   'text/plain'
// 	    },
// 	    // Whether the request is to another domain
// 	    crossDomain: false,
// 	    // Default timeout
// 	    timeout: 0
// 	  };
// 	
// 	  // ### $.ajax
// 	  //
// 	  // Perform AJAX request
// 	  //
// 	  // *Arguments:*
// 	  //
// 	  //     options — object that configure the request,
// 	  //               see avaliable options below
// 	  //
// 	  // *Avaliable options:*
// 	  //
// 	  //     type ('GET')          — type of request GET / POST
// 	  //     url (window.location) — url to which the request is sent
// 	  //     data                  — data to send to server,
// 	  //                             can be string or object
// 	  //     dataType ('json')     — what response type you accept from
// 	  //                             the server:
// 	  //                             'json', 'xml', 'html', or 'text'
// 	  //     timeout (0)           — request timeout
// 	  //     beforeSend            — callback that is executed before
// 	  //                             request send
// 	  //     complete              — callback that is executed on request
// 	  //                             complete (both: error and success)
// 	  //     success               — callback that is executed if
// 	  //                             the request succeeds
// 	  //     error                 — callback that is executed if
// 	  //                             the server drops error
// 	  //     context               — in which context to execute the
// 	  //                             callbacks in
// 	  //
// 	  // *Example:*
// 	  //
// 	  //     $.ajax({
// 	  //        type:       'POST',
// 	  //        url:        '/projects',
// 	  //        data:       { name: 'Zepto.js' },
// 	  //        dataType:   'html',
// 	  //        timeout:    100,
// 	  //        context:    $('body'),
// 	  //        success:    function (data) {
// 	  //            this.append(data);
// 	  //        },
// 	  //        error:    function (xhr, type) {
// 	  //            alert('Error!');
// 	  //        }
// 	  //     });
// 	  //
// 	  $.ajax = function(options){
// 	    var settings = $.extend({}, options || {});
// 	    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
// 	
// 	    ajaxStart(settings);
// 	
// 	    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
// 	      RegExp.$2 != window.location.host;
// 	
// 	    if (/=\?/.test(settings.url)) return $.ajaxJSONP(settings);
// 	
// 	    if (!settings.url) settings.url = window.location.toString();
// 	    if (settings.data && !settings.contentType) settings.contentType = 'application/x-www-form-urlencoded';
// 	    if (isObject(settings.data)) settings.data = $.param(settings.data);
// 	
// 	    if (settings.type.match(/get/i) && settings.data) {
// 	      var queryString = settings.data;
// 	      if (settings.url.match(/\?.*=/)) {
// 	        queryString = '&' + queryString;
// 	      } else if (queryString[0] != '?') {
// 	        queryString = '?' + queryString;
// 	      }
// 	      settings.url += queryString;
// 	    }
// 	
// 	    var mime = settings.accepts[settings.dataType],
// 	        baseHeaders = { },
// 	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
// 	        xhr = $.ajaxSettings.xhr(), abortTimeout;
// 	
// 	    if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest';
// 	    if (mime) baseHeaders['Accept'] = mime;
// 	    settings.headers = $.extend(baseHeaders, settings.headers || {});
// 	
// 	    xhr.onreadystatechange = function(){
// 	      if (xhr.readyState == 4) {
// 	        clearTimeout(abortTimeout);
// 	        var result, error = false;
// 	        if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 0 && protocol == 'file:')) {
// 	          if (mime == 'application/json' && !(/^\s*$/.test(xhr.responseText))) {
// 	            try { result = JSON.parse(xhr.responseText); }
// 	            catch (e) { error = e; }
// 	          }
// 	          else result = xhr.responseText;
// 	          if (error) ajaxError(error, 'parsererror', xhr, settings);
// 	          else ajaxSuccess(result, xhr, settings);
// 	        } else {
// 	          ajaxError(null, 'error', xhr, settings);
// 	        }
// 	      }
// 	    };
// 	
// 	    var async = 'async' in settings ? settings.async : true;
// 	    xhr.open(settings.type, settings.url, async);
// 	
// 	    if (settings.contentType) settings.headers['Content-Type'] = settings.contentType;
// 	    for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name]);
// 	
// 	    if (ajaxBeforeSend(xhr, settings) === false) {
// 	      xhr.abort();
// 	      return false;
// 	    }
// 	
// 	    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
// 	        xhr.onreadystatechange = empty;
// 	        xhr.abort();
// 	        ajaxError(null, 'timeout', xhr, settings);
// 	      }, settings.timeout);
// 	
// 	    xhr.send(settings.data);
// 	    return xhr;
// 	  };
// 	
// 	  // ### $.get
// 	  //
// 	  // Load data from the server using a GET request
// 	  //
// 	  // *Arguments:*
// 	  //
// 	  //     url     — url to which the request is sent
// 	  //     success — callback that is executed if the request succeeds
// 	  //
// 	  // *Example:*
// 	  //
// 	  //     $.get(
// 	  //        '/projects/42',
// 	  //        function (data) {
// 	  //            $('body').append(data);
// 	  //        }
// 	  //     );
// 	  //
// 	  $.get = function(url, success){ return $.ajax({ url: url, success: success }) };
// 	
// 	  // ### $.post
// 	  //
// 	  // Load data from the server using POST request
// 	  //
// 	  // *Arguments:*
// 	  //
// 	  //     url        — url to which the request is sent
// 	  //     [data]     — data to send to server, can be string or object
// 	  //     [success]  — callback that is executed if the request succeeds
// 	  //     [dataType] — type of expected response
// 	  //                  'json', 'xml', 'html', or 'text'
// 	  //
// 	  // *Example:*
// 	  //
// 	  //     $.post(
// 	  //        '/projects',
// 	  //        { name: 'Zepto.js' },
// 	  //        function (data) {
// 	  //            $('body').append(data);
// 	  //        },
// 	  //        'html'
// 	  //     );
// 	  //
// 	  $.post = function(url, data, success, dataType){
// 	    if ($.isFunction(data)) dataType = dataType || success, success = data, data = null;
// 	    return $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
// 	  };
// 	
// 	  // ### $.getJSON
// 	  //
// 	  // Load JSON from the server using GET request
// 	  //
// 	  // *Arguments:*
// 	  //
// 	  //     url     — url to which the request is sent
// 	  //     success — callback that is executed if the request succeeds
// 	  //
// 	  // *Example:*
// 	  //
// 	  //     $.getJSON(
// 	  //        '/projects/42',
// 	  //        function (json) {
// 	  //            projects.push(json);
// 	  //        }
// 	  //     );
// 	  //
// 	  $.getJSON = function(url, success){
// 	    return $.ajax({ url: url, success: success, dataType: 'json' });
// 	  };
// 	
// 	  // ### $.fn.load
// 	  //
// 	  // Load data from the server into an element
// 	  //
// 	  // *Arguments:*
// 	  //
// 	  //     url     — url to which the request is sent
// 	  //     [success] — callback that is executed if the request succeeds
// 	  //
// 	  // *Examples:*
// 	  //
// 	  //     $('#project_container').get(
// 	  //        '/projects/42',
// 	  //        function () {
// 	  //            alert('Project was successfully loaded');
// 	  //        }
// 	  //     );
// 	  //
// 	  //     $('#project_comments').get(
// 	  //        '/projects/42 #comments',
// 	  //        function () {
// 	  //            alert('Comments was successfully loaded');
// 	  //        }
// 	  //     );
// 	  //
// 	  $.fn.load = function(url, success){
// 	    if (!this.length) return this;
// 	    var self = this, parts = url.split(/\s/), selector;
// 	    if (parts.length > 1) url = parts[0], selector = parts[1];
// 	    $.get(url, function(response){
// 	      self.html(selector ?
// 	        $(document.createElement('div')).html(response.replace(rscript, "")).find(selector).html()
// 	        : response);
// 	      success && success.call(self);
// 	    });
// 	    return this;
// 	  };
// 	
// 	  var escape = encodeURIComponent;
// 	
// 	  function serialize(params, obj, traditional, scope){
// 	    var array = $.isArray(obj);
// 	    $.each(obj, function(key, value) {
// 	      if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']';
// 	      // handle data in serializeArray() format
// 	      if (!scope && array) params.add(value.name, value.value);
// 	      // recurse into nested objects
// 	      else if (traditional ? $.isArray(value) : isObject(value))
// 	        serialize(params, value, traditional, key);
// 	      else params.add(key, value);
// 	    });
// 	  }
// 	
// 	  // ### $.param
// 	  //
// 	  // Encode object as a string of URL-encoded key-value pairs
// 	  //
// 	  // *Arguments:*
// 	  //
// 	  //     obj — object to serialize
// 	  //     [traditional] — perform shallow serialization
// 	  //
// 	  // *Example:*
// 	  //
// 	  //     $.param( { name: 'Zepto.js', version: '0.6' } );
// 	  //
// 	  $.param = function(obj, traditional){
// 	    var params = [];
// 	    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) };
// 	    serialize(params, obj, traditional);
// 	    return params.join('&').replace('%20', '+');
// 	  };
// 	})(Zepto);
// 	
// 
// 
// 	//Reverse side effects. 
// 	window.Zepto = wZepto; 
// 	window.$ = w$; 
// 
// 	return Zepto; 
// }()); 
// 


var requestAnimationFrame = 
	window.requestAnimationFrame       || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};

function createContext(width, height, node) { 	
		var canvas;
		node = node || document.body;  
		canvas = document.createElement("canvas"); 
		canvas.width = width; 
		canvas.height = height; 
		node.appendChild(canvas); 

		var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("experimental-webgl", {alpha : false, preserveDrawingBuffer : true}).getSafeContext()); 

		return gl; 
}

function getSource(id) {
    var node = document.getElementById(id); 
    return node.innerText; 
}

function createCube() {
	var vert = new Float32Array([
		-1, -1,  1, 1,
		 1, -1,  1, 1,
		 1,  1,  1, 1,
		-1,  1,  1, 1,
		-1, -1, -1, 1,
		 1, -1, -1, 1,
		 1,  1, -1, 1,
		-1,  1, -1, 1
	]); 

	var n = 0.577350269; //sqrt(3) / 3

	var norm = new Float32Array([
		-n, -n,  n, 0,
		 n, -n,  n, 0,
		 n,  n,  n, 0,
		-n,  n,  n, 0,
		-n, -n, -n, 0,
		 n, -n, -n, 0,
		 n,  n, -n, 0,
		-n,  n, -n, 0
	]); 

	var indx = new Uint16Array([
		0,1,2,
		0,2,3,
		1,5,6,
		1,6,2,
		5,4,7,
		5,7,6,
		4,0,3,
		4,3,7,
		3,2,6,
		3,6,7,
		4,5,1,
		4,1,0
	]);

	return { vertices : vert, indices : indx, normals : norm };
}

function createPlane(level) {
    var vert = [];
    var tex = [];  

    createTriangle(vert, tex, [1,0,1], [-1,0,1], [-1,0,-1], [1,1], [0,1], [0,0], level || 0); 
    createTriangle(vert, tex, [1,0,1], [-1,0,-1], [1,0,-1], [1,1], [0,0], [1,0], level || 0); 

    return { vertices : new Float32Array(vert), texCoords : new Float32Array(tex) }; 

    function createTriangle(vert, tex, v1, v2, v3, t1, t2, t3, n) { 
        if(n === 0) {
            vert.push(v1[0], v1[1], v1[2], 1.0); 
            vert.push(v2[0], v2[1], v2[2], 1.0); 
            vert.push(v3[0], v3[1], v3[2], 1.0); 

            tex.push(t1[0], t1[1]); 
            tex.push(t2[0], t2[1]); 
            tex.push(t3[0], t3[1]); 

            return; 
        }

        var v12 = middleVec(v1, v2); 
        var v23 = middleVec(v2, v3); 
        var v31 = middleVec(v3, v1); 

        var t12 = middleTex(t1, t2); 
        var t23 = middleTex(t2, t3); 
        var t31 = middleTex(t3, t1); 

        createTriangle(vert, tex, v1, v12, v31, t1, t12, t31, n-1); 
        createTriangle(vert, tex, v2, v23, v12, t2, t23, t12, n-1); 
        createTriangle(vert, tex, v3, v31, v23, t3, t31, t23, n-1); 
        createTriangle(vert, tex, v12, v23, v31, t12, t23, t31, n-1); 

        function middleVec(v1, v2) {
            var x1,y1,z1,x2,y2,z2; 
            x1 = v1[0]; 
            y1 = v1[1]; 
            z1 = v1[2]; 
            x2 = v2[0]; 
            y2 = v2[1]; 
            z2 = v2[2]; 

            return [ (x1 + x2) / 2,  (y1 + y2) / 2,  (z1 + z2) / 2 ]; 
        }

        function middleTex(t1, t2) {
            var x1,y1,x2,y2; 

            x1 = t1[0];
            y1 = t1[1]; 
            x2 = t2[0];
            y2 = t2[1]; 

            return [ (x1 + x2) / 2, (y1 + y2) / 2 ]; 
        }
    }
}

var requestGameFrame = (function() {
	var starttime = -1; 
	var lasttime = 0;
	var frame = 0; 
	var delta = 0; 
	var total = 0; 

	var time = {
		get "delta"() { return delta; }, 
		get "total"() { return total; } 
	};

	var loopObject = {
		get "time"() { return time; },
		get "frame"() { return frame; }, 
		get "reset"() { return reset;}
	};
	
	function reset() {
		starttime = -1;  
	}

	return function (callback) { 
		requestAnimationFrame(function () {
			var now = Date.now(); 
			if(starttime === -1) {
				lasttime = now;
				starttime = now; 
				frame = 0; 
			}

			delta = (now - lasttime) / 1000.0; 
			total = (now - starttime) / 1000.0; 

			joyfuncs.update(); 

			callback(loopObject); 

			keyfuncs.setOldKeyState(); 
			lasttime = now; 
			frame++;
		}); 
	};
}()); 

var shapes = {
	get "createPlane"() { return createPlane; }, 
	get "createCube"() { return createCube; }, 
};

// UTIL.keys.x.down
// UTIL.keys.x.up
// UTIL.keys.x.pressed
// UTIL.keys.x.released

var keys = {
	get codes() { return keyfuncs.keys; }, 
	get isDown() { return keyfuncs.keyisDown; }, 
	get isUp() { return keyfuncs.keyisUp; }, 
	get wasPressed() { return keyfuncs.keyWasPressed; }, 
	get wasReleased() { return keyfuncs.keyWasReleased; } 
};

for(var kn in keyfuncs.keys) {
	(function(keyname, keycode) { 
		var funcs = {
			get down() { return keyfuncs.keyIsDown(keycode); },
			get up() { return keyfuncs.keyIsUp(keycode); },
			get pressed() { return keyfuncs.keyWasPressed(keycode); },
			get released() { return keyfuncs.keyWasReleased(keycode); },
		}; 

		Object.defineProperty(keys, keyname, {
			"get" : function() { return funcs; }  
		});
	}(kn, keyfuncs.keys[kn])); 
} 

var gamepads = {
	get "first"() { return joyfuncs.getFirstPad(); } 
};

var obj = {
	get "parse"() { return objparse.parse; }
}

return {
	get "requestGameFrame"() { return  requestGameFrame; }, 
	get "createContext"() { return  createContext; },
	get "getSource"() { return getSource; },  
	get "shapes"() { return shapes; },
	get "obj"() { return  obj; }, 
	get "keys"() { return keys; },
	get "gamepads"() { return gamepads; },  
	get "ajax"() { return zepto.ajax; } 
}; 
}()); 


var SHAPES = (function() {
	var module = {}; 

	module.createGround = function (gl, projection) { 
	    var vPositionIndx = 0; 
	    var vColorIndx = 1; 
	    var vTransIndx = 2; 
		var modelview = mat4.identity();
		var alpha = 0; 
	
	    var vShaderSrc = UTIL.getSource("shader.vs");
	    var fShaderSrc = UTIL.getSource("shader.fs");
	
	    var vertexShader = gl.createShader(gl.VERTEX_SHADER); 
	    gl.shaderSource(vertexShader, vShaderSrc); 
	    gl.compileShader(vertexShader); 
	
	    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
	    gl.shaderSource(fragmentShader, fShaderSrc); 
	    gl.compileShader(fragmentShader); 
	
	    var program = gl.createProgram(); 
	
	    gl.attachShader(program, vertexShader); 
	    gl.attachShader(program, fragmentShader); 
	    gl.linkProgram(program); 
	
	    gl.bindAttribLocation(program, vPositionIndx, "vPosition"); 
	
	    gl.useProgram(program); 
	
	    //Vertices
	    var plane = UTIL.shapes.createPlane(2); 
	    var vertices = plane.vertices; 
	    var texCoords = plane.texCoords; 
	
		for(var i=0; i < texCoords.length; i+=2) {
			texCoords[i] = texCoords[i] * 8.; 
			texCoords[i+1] = texCoords[i+1] * 8.; 
		}
	
	    program.numVertices = vertices.length / 4; 
	
	    var posbuffer = gl.createBuffer(); 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0); 
	    gl.enableVertexAttribArray(0); 
	
	    //Texture
	    var texbuffer = gl.createBuffer(); 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, texbuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
	
	    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0); 
	    gl.enableVertexAttribArray(1); 
	
	    var texture = gl.createTexture(); 
	    var image = new Image(); 
	    image.onload = function() {
			console.log("Hallo"); 
	        gl.bindTexture(gl.TEXTURE_2D, texture);
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        gl.bindTexture(gl.TEXTURE_2D, null);
	    };
	    image.src = "tex.png"; 
	
	    program.texture = texture; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
		return {
			"draw" : function(camera) {
				gl.useProgram(program); 
	
				//TEST 			
	    		gl.enableVertexAttribArray(0); 
	 		    gl.enableVertexAttribArray(1); 
	
				mat4.identity(modelview); 
	
				mat4.multiply(modelview, camera); 
				mat4.scale(modelview, [10,1,10]); 
				mat4.rotateY(modelview, alpha); 
						
				//var proj = mat4.identity(); 
				//mat4.inverse(eye, proj); 
				//mat4.multiply(eye, projection, proj); 
	
				var vModelViewIndx = gl.getUniformLocation(program, "vModelView");
				gl.uniformMatrix4fv(vModelViewIndx, false, modelview);
	
				var vProjectionIndx = gl.getUniformLocation(program, "vProjection");
				gl.uniformMatrix4fv(vProjectionIndx, false, projection);
	
				//var vEyeIndx = gl.getUniformLocation(program, "vEye");
				//gl.uniformMatrix4fv(vEyeIndx, false, eye);
				var fTexIndx = gl.getUniformLocation(program, "texture");
	
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, program.texture);
				gl.uniform1i(fTexIndx, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer); 
				gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(0); 
	
				gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
	
			    gl.bindBuffer(gl.ARRAY_BUFFER, null);
			}, 
			"update" : function(milis) {
				var a = milis * 2 * Math.PI / 1000;
	
				if(UTIL.keys.q.down) { 
					alpha += a; 
				}
	
				/*if(UTIL.keyIsDown(UTIL.keys.e)) { 
					alpha -= a; 
				}*/
			}
		};	
	}
	
	

	module.createTeapot = function (gl, projection) { 
		var modelview = mat4.identity();
		var alphax = 0; 
		var alphay = 0; 
		var position = [0,1,0]; 
	
	    var vShaderSrc = UTIL.getSource("shaderPhong.vs");
	    var fShaderSrc = UTIL.getSource("shaderPhong.fs");
	
	    var vertexShader = gl.createShader(gl.VERTEX_SHADER); 
	    gl.shaderSource(vertexShader, vShaderSrc); 
	    gl.compileShader(vertexShader); 
	
	    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
	    gl.shaderSource(fragmentShader, fShaderSrc); 
	    gl.compileShader(fragmentShader); 
	
	    var program = gl.createProgram(); 
	
	    gl.attachShader(program, vertexShader); 
	    gl.attachShader(program, fragmentShader); 
	    gl.linkProgram(program); 
	
		//Shader linked
		//Tauschen? 
	    gl.useProgram(program); 
	
	    //Vertices
		var objSource = UTIL.getSource("teapot.obj"); 
	    var obj = UTIL.obj.parse(objSource);  
	    //var obj = UTIL.createCube();  
		
	    var vertices = obj.vertices; 
		var indices = obj.indices; 
		var normals = obj.normals; 
	
		//----
	    var vertexBuffer = gl.createBuffer(); 
		var vertexElementSize = 4; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	    var vertexBufferElements = vertices.length / vertexElementSize; 
	
		var aVertexIndex = gl.getAttribLocation(program, "aVertex"); 
		if(aVertexIndex === -1) {
			throw new Error("aVertex does not exist."); 
		}
	    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
		//----
	
		//----
	    var normalBuffer = gl.createBuffer(); 
		var normalElementSize = 4; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
	
	    var normalBufferSize = normals.length / normalElementSize; 
	
		var aNormalIndex = gl.getAttribLocation(program, "aNormal"); 
		if(aNormalIndex === -1) {
			throw new Error("aNormal does not exist."); 
		}
	    gl.vertexAttribPointer(aNormalIndex, 4, gl.FLOAT, false, 0, 0); 
	    //gl.enableVertexAttribArray(normalBufferIndex); 
		//----
	
		var indexBuffer = gl.createBuffer(); 	
		var indexBufferElements = indices.length; 
	
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); 		
	
		return {
			"draw" : function(camera) {
				//TEMPORARY VALUES 			
				var uCameraPosition = vec3.create([camera[3], camera[7], camera[11]]); 
				var uLightPosition = vec3.create([100,100,100]); 
				var uWorldIllum = 0.9; 
	            var uMaterialIllum = 0.7; 
	            var uMaterialDiffus = 1.0;   
	            var uMaterialSpecular = 0.7; 
	            var uLightStrength = 0.5;  		
				//----
	
				gl.useProgram(program); 
	
				//TEST 			
	    		gl.enableVertexAttribArray(aVertexIndex); 
	    		gl.enableVertexAttribArray(aNormalIndex); 
	
				mat4.identity(modelview); 
	
				mat4.multiply(modelview, camera); 
	
				mat4.translate(modelview, position); 
				mat4.rotateY(modelview, alphax); 
				mat4.rotateX(modelview, alphay); 
				var s = 1 / 40; 
				mat4.scale(modelview, [s,s,s]);  
	
				//!!! camera = mat4.lookAt(....); 
				//!!! mat4.multiply(modelview, camera); 
				//mat4.translate(modelview, [0,-0.5,-2]); 
				//mat4.scale(modelview, [20,1,20]); 
				//mat4.rotateY(modelview, alpha); 
				
				/*
	uniform mat4 uProjection; 
	uniform vec3 uCameraPosition; 
	uniform vec3 uLightPosition; 
	
	uniform float uWorldIllum; 
	uniform float uMaterialIllum;
	uniform float uMaterialDiffus;  
	uniform float uMaterialSpecular; 
	uniform float uLightStrength; 
	
	uniform mat4 uModelview;
				*/
				
				var uProjectionIndex = gl.getUniformLocation(program, "uProjection") || throwError();
				gl.uniformMatrix4fv(uProjectionIndex, false, projection);
				
				var uCameraPositionIndex = gl.getUniformLocation(program, "uCameraPosition") || throwError();
				gl.uniform3fv(uCameraPositionIndex, uCameraPosition);
	
				var uLightPositionIndex = gl.getUniformLocation(program, "uLightPosition") || throwError();
				gl.uniform3fv(uLightPositionIndex, uLightPosition); 
	
				var uWorldIllumIndex = gl.getUniformLocation(program, "uWorldIllum") || throwError();
				gl.uniform1f(uWorldIllumIndex, uWorldIllum);
	
				var uMaterialIllumIndex = gl.getUniformLocation(program, "uMaterialIllum") || throwError();
				gl.uniform1f(uMaterialIllumIndex, uMaterialIllum);
	
				var uMaterialDiffusIndex = gl.getUniformLocation(program, "uMaterialDiffus") || throwError();
				gl.uniform1f(uMaterialDiffusIndex, uMaterialDiffus);
	
				var uMaterialSpecularIndex = gl.getUniformLocation(program, "uMaterialSpecular") || throwError();
				gl.uniform1f(uMaterialSpecularIndex, uMaterialSpecular); 
	
				var uLightStrengthIndex = gl.getUniformLocation(program, "uLightStrength") || throwError();
				gl.uniform1f(uLightStrengthIndex, uLightStrength); 
				
				var uModelViewIndex = gl.getUniformLocation(program, "uModelview") || throwError();
				gl.uniformMatrix4fv(uModelViewIndex, false, modelview);			
	
				//var vEyeIndx = gl.getUniformLocation(program, "vEye");
				//gl.uniformMatrix4fv(vEyeIndx, false, eye);
				//var fTexIndx = gl.getUniformLocation(program, "texture");
	
				//gl.activeTexture(gl.TEXTURE0);
				//gl.bindTexture(gl.TEXTURE_2D, program.texture);
				//gl.uniform1i(fTexIndx, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); 
			    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(aVertexIndex); 
	
				gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); 
			    gl.vertexAttribPointer(aNormalIndex, normalElementSize, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(aNormalIndex); 
		
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);        
	
	        	gl.drawElements(gl.TRIANGLES, indexBufferElements, gl.UNSIGNED_SHORT, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, null); 
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
				//gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
				//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
			}, 
			"update" : function(secs) {
				var a = secs * 2 * Math.PI;
				var step = secs; 
	
				if(UTIL.keys.x.down) { 
					alphax += a; 
				}
	
				/*if(UTIL.keyIsDown(UTIL.keys.l)) { 
					alphax -= a; 
				}			
	
				if(UTIL.keyIsDown(UTIL.keys.i)) { 
					alphay += a; 
				}
	
				if(UTIL.keyIsDown(UTIL.keys.k)) { 
					alphay -= a; 
				}*/			
	
				alphax += secs * Math.PI * 2  * 0.2; 
				alphay += secs * Math.PI * 2  * 0.1; 
			}
		};	
	
		function throwError() {
			throw ":("; 
		}
	}
	

	module.createPlane = function (gl, projection) { 
		var modelview = mat4.identity();
		var alphax = 0; 
		var alphay = 0; 
		var position = [0,0,0]; 
	
	    var vShaderSrc = UTIL.getSource("shaderPhong.vs");
	    var fShaderSrc = UTIL.getSource("shaderPhong.fs");
	
	    var vertexShader = gl.createShader(gl.VERTEX_SHADER); 
	    gl.shaderSource(vertexShader, vShaderSrc); 
	    gl.compileShader(vertexShader); 
	
	    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
	    gl.shaderSource(fragmentShader, fShaderSrc); 
	    gl.compileShader(fragmentShader); 
	
	    var program = gl.createProgram(); 
	
	    gl.attachShader(program, vertexShader); 
	    gl.attachShader(program, fragmentShader); 
	    gl.linkProgram(program); 
	
		//Shader linked
		//Tauschen? 
	    gl.useProgram(program); 
	
	    //Vertices
		var objSource = UTIL.getSource("plane.obj"); 
	    var obj = UTIL.obj.parse(objSource);  
	    //var obj = UTIL.createCube();  
		
	    var vertices = obj.vertices; 
		var indices = obj.indices; 
		var normals = obj.normals; 
		var textureCoords = obj.textureCoordinates; 
	
		//----
	    var vertexBuffer = gl.createBuffer(); 
		var vertexElementSize = 4; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	    var vertexBufferElements = vertices.length / vertexElementSize; 
	
		var aVertexIndex = gl.getAttribLocation(program, "aVertex"); 
		if(aVertexIndex === -1) {
			throw new Error("aVertex does not exist."); 
		}
	    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
		//----
	    var normalBuffer = gl.createBuffer(); 
		var normalElementSize = 4; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
	
	    var normalBufferSize = normals.length / normalElementSize; 
	
		var aNormalIndex = gl.getAttribLocation(program, "aNormal"); 
		if(aNormalIndex === -1) {
			throw new Error("aNormal does not exist."); 
		}
	    gl.vertexAttribPointer(aNormalIndex, normalElementSize, gl.FLOAT, false, 0, 0); 
		//----
		var textureCoordsBuffer = gl.createBuffer(); 
		var textureCoordsElementSize = 2; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordsBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);
	
	    var textureCoordsBufferSize = textureCoords.length / textureCoordsElementSize; 
	
		var aTextureCoordsIndex = gl.getAttribLocation(program, "aTextureCoordinate"); 
		if(aTextureCoordsIndex === -1) {
			throw new Error("aTextureCoordinate does not exist."); 
		}
	    gl.vertexAttribPointer(aNormalIndex, textureCoordsElementSize, gl.FLOAT, false, 0, 0); 
		//----
	
		var texture = gl.createTexture(); 
		var image = new Image(); 
		image.onload = function() {
			gl.bindTexture(gl.TEXTURE_2D, texture);
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	        gl.bindTexture(gl.TEXTURE_2D, null);
		};
		image.src = "img/tex.png"; 
	
		var indexBuffer = gl.createBuffer(); 	
		var indexBufferElements = indices.length; 
	
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); 		
	
		return {
			"draw" : function(camera) {
				//TEMPORARY VALUES 			
				var uCameraPosition = vec3.create([camera[3], camera[7], camera[11]]); 
				var uLightPosition = vec3.create([100,100,100]); 
				var uWorldIllum = 0.9; 
	            var uMaterialIllum = 0.7; 
	            var uMaterialDiffus = 1.0;   
	            var uMaterialSpecular = 0.7; 
	            var uLightStrength = 0.5;  		
				//----
	
				gl.useProgram(program); 
	
				//TEST 			
	    		gl.enableVertexAttribArray(aVertexIndex); 
	    		gl.enableVertexAttribArray(aNormalIndex); 
	
				mat4.identity(modelview); 
	
				mat4.multiply(modelview, camera); 
	
				mat4.translate(modelview, position); 
				mat4.rotateY(modelview, alphax); 
				mat4.rotateX(modelview, alphay); 
	
				//!!! camera = mat4.lookAt(....); 
				//!!! mat4.multiply(modelview, camera); 
				//mat4.translate(modelview, [0,-0.5,-2]); 
				//mat4.scale(modelview, [20,1,20]); 
				//mat4.rotateY(modelview, alpha); 
				
				/*
	uniform mat4 uProjection; 
	uniform vec3 uCameraPosition; 
	uniform vec3 uLightPosition; 
	
	uniform float uWorldIllum; 
	uniform float uMaterialIllum;
	uniform float uMaterialDiffus;  
	uniform float uMaterialSpecular; 
	uniform float uLightStrength; 
	
	uniform mat4 uModelview;
				*/
				
				var uProjectionIndex = gl.getUniformLocation(program, "uProjection") || throwError();
				gl.uniformMatrix4fv(uProjectionIndex, false, projection);
				
				var uCameraPositionIndex = gl.getUniformLocation(program, "uCameraPosition") || throwError();
				gl.uniform3fv(uCameraPositionIndex, uCameraPosition);
	
				var uLightPositionIndex = gl.getUniformLocation(program, "uLightPosition") || throwError();
				gl.uniform3fv(uLightPositionIndex, uLightPosition); 
	
				var uWorldIllumIndex = gl.getUniformLocation(program, "uWorldIllum") || throwError();
				gl.uniform1f(uWorldIllumIndex, uWorldIllum);
	
				var uMaterialIllumIndex = gl.getUniformLocation(program, "uMaterialIllum") || throwError();
				gl.uniform1f(uMaterialIllumIndex, uMaterialIllum);
	
				var uMaterialDiffusIndex = gl.getUniformLocation(program, "uMaterialDiffus") || throwError();
				gl.uniform1f(uMaterialDiffusIndex, uMaterialDiffus);
	
				var uMaterialSpecularIndex = gl.getUniformLocation(program, "uMaterialSpecular") || throwError();
				gl.uniform1f(uMaterialSpecularIndex, uMaterialSpecular); 
	
				var uLightStrengthIndex = gl.getUniformLocation(program, "uLightStrength") || throwError();
				gl.uniform1f(uLightStrengthIndex, uLightStrength); 
				
				var uModelViewIndex = gl.getUniformLocation(program, "uModelview") || throwError();
				gl.uniformMatrix4fv(uModelViewIndex, false, modelview);			
	
				var uTextureIndex = gl.getUniformLocation(program, "uTexture") || throwError(); 
				gl.activeTexture(gl.TEXTURE0); 
				gl.bindTexture(gl.TEXTURE_2D, texture); 
				gl.uniform1i(uTextureIndex, 0); 
	
				//var vEyeIndx = gl.getUniformLocation(program, "vEye");
				//gl.uniformMatrix4fv(vEyeIndx, false, eye);
				//var fTexIndx = gl.getUniformLocation(program, "texture");
	
				//gl.activeTexture(gl.TEXTURE0);
				//gl.bindTexture(gl.TEXTURE_2D, program.texture);
				//gl.uniform1i(fTexIndx, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); 
			    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(aVertexIndex); 
	
				gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); 
			    gl.vertexAttribPointer(aNormalIndex, normalElementSize, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(aNormalIndex); 
	
				gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordsBuffer); 
			    gl.vertexAttribPointer(aTextureCoordsIndex, textureCoordsElementSize, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(aTextureCoordsIndex); 
		
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);        
	
	        	gl.drawElements(gl.TRIANGLES, indexBufferElements, gl.UNSIGNED_SHORT, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, null); 
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
				//gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
				//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
			}, 
			"update" : function(secs) {
				var a = secs * 2 * Math.PI;
				var step = secs; 
	
				if(UTIL.keys.j.down) { 
					alphax += a; 
				}
	
				if(UTIL.keys.l.down) { 
					alphax -= a; 
				}			
	
				if(UTIL.keys.i.down) { 
					alphay += a; 
				}
	
				if(UTIL.keys.k.down) { 
					alphay -= a; 
				}			
	
				alphax += secs * Math.PI * 2  * 0.2; 
				alphay += secs * Math.PI * 2  * 0.1; 
			}
		};	
	
		function throwError() {
			throw ":("; 
		}
	}
	


	return module; 
}());



// MAIN 
var projection = mat4.perspective(75, 4/3, 0.1, 10); 
var isRunning = true; 

function main() {
    gl = UTIL.createContext(640, 480); 

	var camPos = vec3.create([0,1,2]);
	var camNormal = vec3.create([0,0,-1]); 
	var camDir = vec3.create([0,0,0]); 
	var camUp = vec3.create([0,1,0]); 

    //var teapot = SHAPES.createTeapot(gl, projection); 
    var ground = SHAPES.createGround(gl, projection); 
    //var plane = SHAPES.createPlane(gl, projection); 

	UTIL.requestGameFrame(gameloop); 

    function gameloop(info) {
        if(isRunning) { 			
			var camera = calcCamera(info.time.delta, camPos, camNormal, camDir, camUp); 

			clear(gl); 
            ground.draw(camera);
			//teapot.draw(camera); 
			//plane.draw(camera); 
            ground.update(info.time.delta); 
			//teapot.update(info.time.delta); 
			//plane.update(info.time.delta); 
        }
		
		if(UTIL.keys.p.released) {
			isRunning = !isRunning; 
		}

        UTIL.requestGameFrame(gameloop); 
    }
}

function calcCamera(delta, camPos, camNormal, camDir, camUp) {
	var d = delta; 

	if(UTIL.keys.shift.down) {
		d *= 3; 
	}

	var camera = mat4.lookAt(camPos, vec3.add(camPos, camNormal, camDir), camUp);
	var pad = UTIL.gamepads.first;  

	var padX1 = pad.axes[0]; 
	var padY1 = pad.axes[1];
	var padX2 = pad.axes[2];
	var padY2 = pad.axes[3];

	var forward = padY1 * d; 
	var spin = padX2 * d * 2 * Math.PI; 

	forward += UTIL.keys.w.down ? d : 0; 
	forward -= UTIL.keys.s.down ? d : 0; 
	spin += UTIL.keys.a.down ? 2 * Math.PI * d : 0; 
	spin -= UTIL.keys.d.down ? 2 * Math.PI * d : 0; 

	vec3.add(camPos, [forward * camNormal[0], 0, forward * camNormal[2]]); 

	var matRot = mat4.identity(); 
	mat4.rotateY(matRot, spin); 
	mat4.rotateX(matRot, padY2); 
	mat4.multiplyVec3(matRot, camNormal); 

	return camera; 
}

function clear(gl) {
    gl.viewport(0, 0, 640, 480); 
    gl.clearColor(97 / 256, 149 / 256, 237 / 256, 1); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
	gl.enable(gl.DEPTH_TEST); 
}

window.onload = main; 

