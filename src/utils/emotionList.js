const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

export const emotionList = [
	{
		emotionId: 1,
		emotionImg: process.env.PUBLIC_URL + `/assets/emotion1.png`,
		emotionDescription: 'Very Good',
	},
	{
		emotionId: 2,
		emotionImg: process.env.PUBLIC_URL + `/assets/emotion2.png`,
		emotionDescription: 'Good',
	},
	{
		emotionId: 3,
		emotionImg: process.env.PUBLIC_URL + `/assets/emotion3.png`,
		emotionDescription: 'Fine',
	},
	{
		emotionId: 4,
		emotionImg: process.env.PUBLIC_URL + `/assets/emotion4.png`,
		emotionDescription: 'Bad',
	},
	{
		emotionId: 5,
		emotionImg: process.env.PUBLIC_URL + `/assets/emotion5.png`,
		emotionDescription: 'Very Bad',
	},
];