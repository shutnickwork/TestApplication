#import <Foundation/Foundation.h>


@interface TestConfigurationProvider : NSObject

+ (BOOL) isAvailable;

+ (NSString*) testIp;

@end
