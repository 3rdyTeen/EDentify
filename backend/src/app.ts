import bodyParser from 'body-parser'; // Node.js body parsing middleware.
import cookieParser from 'cookie-parser'; // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
import cors from 'cors'; // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
import express from 'express'; // web framework for Node.js.
import rateLimitter from 'express-rate-limit'; // Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
import helmet from 'helmet'; // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
import hpp from 'hpp'; //Express middleware to protect against HTTP Parameter Pollution attacks
import morgan from 'morgan'; // HTTP request logger middleware for node.js

/** Custom Middlewares */
import errorHandlerMiddleware from './middlewares/error-handler';
import notFound from './middlewares/not-found';

/** Routes */
import loadRoutes from './routes/index';

const app = express();

app.set('trust proxy', 1);

app.use(cors());

app.use(cookieParser(process.env.JWT_SECRET));

// Setup express response and body parser configurations
app.use(express.json({ limit: '10kb' })); // Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
app.use(bodyParser.json()); // Returns middleware that only parses json
app.use(bodyParser.urlencoded({ extended: true })); // Returns middleware that only parses urlencoded bodies

app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimitter({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: 'Too many Requests from this IP, please try again in an hour!',
});

app.use(limiter);

app.use(
  express.urlencoded({
    extended: true,
  })
); // Returns middleware that only parses urlencoded bodies

app.use(hpp());

app.get('/', (req, res) => {
  res.json({ message: 'Hello REST API' });
});

loadRoutes(app);

app.use(notFound);
app.use(errorHandlerMiddleware);

export default app;
