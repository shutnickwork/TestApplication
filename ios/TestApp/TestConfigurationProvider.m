#import "TestConfigurationProvider.h"

@implementation TestConfigurationProvider {

}

+ (BOOL)isDebug { 
#ifdef DEBUG
    BOOL isDebug = true;
#else
    BOOL isDebug = false;
#endif
    return isDebug;
}

+ (NSString*) content {
    NSString *ipPath = [[NSBundle mainBundle] pathForResource:@"customPackagerIp" ofType:@"txt"];
    NSString *customIp = [[NSString stringWithContentsOfFile:ipPath encoding:NSUTF8StringEncoding error:nil]
            stringByTrimmingCharactersInSet:[NSCharacterSet newlineCharacterSet]];

    return [customIp stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

+ (BOOL)isAvailable {
    if ([TestConfigurationProvider isDebug]) {
        return [TestConfigurationProvider content].length > 0;
    } else {
        return NO;
    }
}

+ (NSString *)testIp {
    return [TestConfigurationProvider content];
}

@end
