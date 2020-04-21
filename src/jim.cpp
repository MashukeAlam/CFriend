
    #include <bits/stdc++.h>
using namespace std;
#define rep(i,a,n) for (int i=a;i<n;i++)
#define per(i,a,n) for (int i=n-1;i>=a;i--)
#define pb push_back
#define mp make_pair
#define all(x) (x).begin(),(x).end()
#define fi first
#define se second
#define SZ(x) ((int)(x).size())
typedef vector<int> VI;
typedef long long ll;
typedef pair<int,int> PII;
typedef double db;
mt19937_64 mrand(random_device{}()); 
const ll mod=1000000007;
int rnd(int x) { return mrand() % x;}
ll powmod(ll a,ll b) {ll res=1;a%=mod; assert(b>=0); for(;b;b>>=1){if(b&1)res=res*a%mod;a=a*a%mod;}return res;}
ll gcd(ll a,ll b) { return b?gcd(b,a%b):a;}
// head

int _,__;
ll x,y;
int calcs(ll x,ll y) {
	ll f=abs(x)+abs(y);
	if (x==0&&y==0) return 0;
	else if ((x+y)%2==0) return 114514;
	for (int i=1;i<=32;i++) if (f<=(1ll<<i)-1) return i;
	return 114514;
}

int main() {
	for (scanf("%d",&_);_;_--) {
		scanf("%lld%lld",&x,&y);
		printf("Case #%d: ",++__);
		if (calcs(x,y)==114514) {
			puts("IMPOSSIBLE");
		} else {
			int d=calcs(x,y);
			string s;
			per(i,0,d) {
				ll w=(1ll<<i);
				if (calcs(x-w,y)<=i) s.pb('E'),x-=w;
				else if (calcs(x+w,y)<=i) s.pb('W'),x+=w;
				else if (calcs(x,y-w)<=i) s.pb('N'),y-=w;
				else if (calcs(x,y+w)<=i) s.pb('S'),y+=w;
				else assert(0);
				//printf("%d %d %d\n",x,y,calcs(x,y));
			}
			reverse(all(s));
			puts(s.c_str());
		}
	}
}